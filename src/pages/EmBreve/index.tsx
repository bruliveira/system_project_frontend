export default function EmBreve({ titulo }: { titulo: string }) {
  return (
    <section className="cartao">
      <div className="pagina-titulo">
        <div>
          <h1>{titulo}</h1>
          <p>Esta área entra na próxima etapa.</p>
        </div>
      </div>
    </section>
  );
}
