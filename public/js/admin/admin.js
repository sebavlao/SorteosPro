const datos = document.querySelectorAll(".oculto");
const spin = document.getElementById("spin");
const form = document.getElementById("form");
const inputM = document.getElementById("mount");

if (datos.length > 0 && spin) {
  setTimeout(() => {
    spin.classList.add("hidden");

    datos.forEach((dato) => {
      dato.classList.remove("hidden");
    });

    form.classList.remove("hidden");
  }, 3000);
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const { value: inputMount, isConfirmed } = await Swal.fire({
      titleText: "Ingresa el dinero ganado: ",
      input: "text",
      showCancelButton: true,
    });

    if (isConfirmed) {
      inputM.value = inputMount;

      try {
        const formData = new FormData(form);
        const plainFormData = Object.fromEntries(formData.entries());

        const res = await fetch("/adminsecret/panel/pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(plainFormData),
        });

        if (res.ok) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);

          window.open(url, "_blank");
        } else {
          Swal.fire({
            icon: "error",
            titleText: "Error",
            text: res.status,
          });
          throw new Error(`${res.status}`);
        }
      } catch (err) {
        console.error("Error en la solicitud: ", err);
      }
    }
  });
}
