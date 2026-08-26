-- Execute esta migration se a tabela de visitas já foi criada.
-- Ela permite que o usuário logado atualize apenas os seus próprios rascunhos.

drop policy if exists visitas_unidades_prisionais_atualizar_propria
  on public.visitas_unidades_prisionais;

create policy visitas_unidades_prisionais_atualizar_propria
on public.visitas_unidades_prisionais
for update
to anon
using (
  criado_por = lower(
    coalesce(current_setting('request.headers', true)::json ->> 'x-user-id', '')
  )
)
with check (
  criado_por = lower(
    coalesce(current_setting('request.headers', true)::json ->> 'x-user-id', '')
  )
);
