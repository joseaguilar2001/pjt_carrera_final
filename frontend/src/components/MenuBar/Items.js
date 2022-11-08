const navlistW = [
    {
      label: "Inicio", 
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location.href = '/';
      }
    }
];

const navlistDespachador = [
  {
    label: "Inicio", 
    icon: "pi pi-fw pi-home",
    command: () => {
      window.location.href = '/';
    }
  },
  {
    label: "Lote",
    icon: "pi pi-fw pi-clone",
    command: () => {
      window.location.href = '/lote';
    },
  },
  {
    label: "Presentacion",
    icon: "pi pi-fw pi-clock",
    command: () => {
      window.location.href = '/presentacion';
    },
  },
  {
    label: "Requisicion",
    icon: "pi pi-fw pi-cloud",
    command: () => {
      window.location.href = '/requision';
    },
  },
  {
    label: "Servicio",
    icon: "pi pi-fw pi-code",
    command: () => {
      window.location.href = '/servicio';
    },
  },
  {
    label: "Pedido",
    icon: "pi pi-fw pi-cog",
    command: () => {
      window.location.href = '/pedido';
    },
  }
];

const navListKardex = [
  {
    label: "Inicio", 
    icon: "pi pi-fw pi-home",
    command: () => {
      window.location.href = '/';
    }
  },
  {
    label: "Kardex",
    icon: "pi pi-fw pi-cloud",
    command: () => {
      window.location.href = '/kardex';
    }
  },
    {
      label: "Detalle Kardex",
      icon: "pi pi-fw pi-cloud",
      command: () => {
        window.location.href = '/detalleKardex/:id';
      },
    }
]

const navListAdmin = [
  {
    label: "Inicio", 
    icon: "pi pi-fw pi-home",
    command: () => {
      window.location.href = '/';
    }
  },
  {
    label: "Registros", 
    icon: "pi pi-fw pi-compass",
    items:[
      {
        label: "Inicio", 
        icon: "pi pi-fw pi-home",
        command: () => {
          window.location.href = '/';
        }
      }
    ]
  },
  {
    label: "Reportes", 
    icon: "pi pi-fw pi-compass",
    items:[
      {
        label: "Inicio", 
        icon: "pi pi-fw pi-home",
        command: () => {
          window.location.href = '/';
        }
      }
    ]
  },
  {
    label: "Usuarios", 
    icon: "pi pi-fw pi-compass",
    items:[
      {
        label: "Inicio", 
        icon: "pi pi-fw pi-home",
        command: () => {
          window.location.href = '/';
        }
      }
    ]
  }
]

const navListUsuario = [
    {
      label: "Inicio", 
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location.href = '/';
      }
    },
    {
      label: "Requision", 
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location.href = '/requisicion';
      }
    },
    {
      label: "Detalles de Requision", 
      icon: "pi pi-fw pi-home",
      command: () => {
        window.location.href = '/detallerequisiecion';
      }
    }
]

// eslint-disable-next-line import/no-anonymous-default-export
export default [navListAdmin, navListKardex, navListUsuario, navlistDespachador, navlistW];