alter table public.levantamentos_ceap
  drop constraint if exists levantamento_ceap_periodo_valido,
  alter column periodo_inicio drop not null,
  alter column periodo_fim drop not null;
