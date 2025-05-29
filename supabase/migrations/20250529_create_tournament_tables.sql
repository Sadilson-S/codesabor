-- Create the campeonatos table
CREATE TABLE IF NOT EXISTS public.campeonatos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  jogo TEXT NOT NULL,
  edicao INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('ativo', 'encerrado')),
  data_inicio TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create the inscricoes table
CREATE TABLE IF NOT EXISTS public.inscricoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_completo TEXT NOT NULL,
  numero_whatsapp TEXT NOT NULL,
  campeonato_id UUID NOT NULL REFERENCES public.campeonatos(id) ON DELETE CASCADE,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_campeonato_id ON public.inscricoes(campeonato_id);
CREATE INDEX IF NOT EXISTS idx_jogo_status ON public.campeonatos(jogo, status);

-- Enable Row Level Security
ALTER TABLE public.campeonatos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscricoes ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (read-only for public users)
CREATE POLICY "Allow public read access to active tournaments" 
  ON public.campeonatos FOR SELECT 
  USING (status = 'ativo');

-- Create policies for authenticated users (full access)
CREATE POLICY "Allow authenticated users full access to tournaments" 
  ON public.campeonatos FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users full access to inscriptions" 
  ON public.inscricoes FOR ALL 
  USING (auth.role() = 'authenticated');

-- Create policy for public inscription creation
CREATE POLICY "Allow public to create inscriptions" 
  ON public.inscricoes FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public to read their own inscriptions" 
  ON public.inscricoes FOR SELECT 
  USING (true);
