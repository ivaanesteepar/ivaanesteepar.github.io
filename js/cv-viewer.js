fetch("docs/CURRICULUM.pdf")
  .then((response) => {
    if (!response.ok) throw new Error("No se pudo cargar el PDF");
    return response.arrayBuffer();
  })
  .then((bytes) => {
    const pdf = new Blob([bytes], { type: "application/pdf" });
    window.location.replace(URL.createObjectURL(pdf));
  })
  .catch(() => {
    document.getElementById("status").hidden = true;
    document.getElementById("fallback").hidden = false;
  });
