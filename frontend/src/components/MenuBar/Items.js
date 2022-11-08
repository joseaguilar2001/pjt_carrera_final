const navlistW = [
    {
      label: "Inicio", 
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location.href = '/';
      }
    },
    {
      separator: true,

    },
    {
      label: "Registrarse",
      icon: "pi pi-fw pi-sign-in",
      command: () => {
        window.location.href = "/register";
      }
    },
    {
      label: "Iniciar sesion",
      icon: "pi pi-fw pi-user",
      command: () => {
        window.location.href = "/login";
      }
    }
];

export default navlistW;