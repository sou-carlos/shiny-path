import "./styles.scss";

export function Island() {
  function openModal() {
    alert("modal aberto");
  }

  return (
    <div className="island-container" onClick={openModal}>
      <p>Ilha 1</p>
    </div>
  );
}
