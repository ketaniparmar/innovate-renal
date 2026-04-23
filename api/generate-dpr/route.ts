import { renderToBuffer } from '@react-pdf/renderer';
import { DPRTemplate } from '@/components/pdf/DPRTemplate'; // Your React-PDF component
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const { projectId } = await req.json();
  const project = await supabase.from('projects').select('*').eq('id', projectId).single();

  // 1. Generate the Narrative
  const summary = generateExecutiveSummary(project.data);

  // 2. Render PDF to Buffer in memory
  const pdfBuffer = await renderToBuffer(<DPRTemplate data={project.data} summary={summary} />);

  // 3. Upload to Supabase Storage
  const fileName = `DPR_${project.data.name}_${Date.now()}.pdf`;
  await supabase.storage.from('dprs').upload(fileName, pdfBuffer, { contentType: 'application/pdf' });

  // 4. Return Public URL
  const { publicUrl } = supabase.storage.from('dprs').getPublicUrl(fileName).data;
  
  return Response.json({ url: publicUrl });
}