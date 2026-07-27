var APP_DATA = {
  "scenes": [
    {
      "id": "0-ramsay",
      "name": "Ramsay",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "yaw": 0.2580442451011038,
        "pitch": -0.01752114493532808,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": 0.1058282945760709,
          "pitch": 0.061713641316014645,
          "rotation": 0,
          "target": "1-calle-interna-desde-ramsay-1"
        }
      ],
      "infoHotspots": [
        {
          "yaw": -0.03357702535995877,
          "pitch": 0.1724557184336959,
          "title": "Acceso vehicular",
          "text": "Entrada para vehículos."
        },
        {
          "yaw": 0.7112043073534462,
          "pitch": 0.06408911006347573,
          "title": "Acceso peatonal",
          "text": "Entrada para personas que llegan caminando. Cuenta con rampa de acceso."
        }
      ]
    },
    {
      "id": "1-calle-interna-desde-ramsay-1",
      "name": "Calle interna desde Ramsay 1",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "yaw": 0.08944010742727215,
        "pitch": 0.036722937631330055,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": -0.05003451844136109,
          "pitch": 0.16900679862108348,
          "rotation": 0,
          "target": "2-calle-interna-desde-ramsay-2"
        },
        {
          "yaw": -2.6646726058309156,
          "pitch": 0.1498600652750408,
          "rotation": 0,
          "target": "0-ramsay"
        }
      ],
      "infoHotspots": [
        {
          "yaw": 0.8769606069820792,
          "pitch": 0.16444394548685004,
          "title": "Camino peatonal",
          "text": "Sendero destinado a la circulación de personas. "
        }
      ]
    },
    {
      "id": "2-calle-interna-desde-ramsay-2",
      "name": "Calle interna desde Ramsay 2",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "yaw": 0.9955502697005194,
        "pitch": -0.015018124230280705,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": -0.11215039043312558,
          "pitch": 0.12471072406885142,
          "rotation": 0,
          "target": "1-calle-interna-desde-ramsay-1"
        },
        {
          "yaw": 0.9145835803153819,
          "pitch": 0.09738769679381853,
          "rotation": 0,
          "target": "3-calle-a-sector-1-y-sector-3"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-calle-a-sector-1-y-sector-3",
      "name": "Calle a sector 1 y Sector 3",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "yaw": 1.6751368444137293,
        "pitch": -0.037545310575705315,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": 1.4727613413131264,
          "pitch": 0.10930985501538437,
          "rotation": 0,
          "target": "4-entrada-principal"
        },
        {
          "yaw": 0.04408621721748496,
          "pitch": 0.08403213266241139,
          "rotation": 0,
          "target": "2-calle-interna-desde-ramsay-2"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "4-entrada-principal",
      "name": "Entrada Principal",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 2048,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -2.328111401409462,
          "pitch": 0.07177805888790445,
          "rotation": 0,
          "target": "3-calle-a-sector-1-y-sector-3"
        }
      ],
      "infoHotspots": [
        {
          "yaw": 0.03650602503539346,
          "pitch": 0.025771132158180166,
          "title": "Puerta principal",
          "text": "Acceso principal a Centro de Formación Profesional N°7.<div>El acceso cuenta con rampa.</div>"
        }
      ]
    }
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": false,
    "viewControlButtons": false
  }
};
