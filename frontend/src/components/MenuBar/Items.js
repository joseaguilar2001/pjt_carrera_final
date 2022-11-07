const navlist = [{
  welcome : [
    {
      label: "Inicio", 
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location.href = '/';
      }
    },
    {
      label: "Sobre de",
      icon: "pi pi-fw pi-calendar",
      command: () => {
        window.location.href = '/about';
      }
    },
    {
      label: "Contacto",
      icon: "pi pi-fw pi-phone",
      command: () => {
        window.location.href = "/contact";
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
  ],
  digitador: [
    {

    }
  ]
}];

export default navlist;