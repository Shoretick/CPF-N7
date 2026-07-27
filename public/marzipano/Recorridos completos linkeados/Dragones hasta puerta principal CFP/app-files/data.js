var APP_DATA = {
  "scenes": [
    {
      "id": "0-dragones",
      "name": "Dragones",
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
        "yaw": 0.049564094671408654,
        "pitch": 0.11262721972711098,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": -0.12283093270610301,
          "pitch": 0.023898403394642997,
          "rotation": 0,
          "target": "1-calle-despues-de-entrada-dragones-1"
        }
      ],
      "infoHotspots": [
        {
          "yaw": -0.11024079376704243,
          "pitch": 0.1763320899907086,
          "title": "Acceso vehicular",
          "text": "Entrada para vehículos"
        },
        {
          "yaw": 1.0256844910986018,
          "pitch": 0.11902445672928685,
          "title": "Acceso peatonal",
          "text": "Entrada para personas que llegan caminando."
        }
      ]
    },
    {
      "id": "1-calle-despues-de-entrada-dragones-1",
      "name": "Calle despues de entrada Dragones 1",
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
          "yaw": -0.09746024173922585,
          "pitch": 0.11214062973134986,
          "rotation": 0,
          "target": "2-calle-despues-de-entrada-dragones-2"
        },
        {
          "yaw": -2.1497268615359832,
          "pitch": 0.14582439069111786,
          "rotation": 0,
          "target": "0-dragones"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-calle-despues-de-entrada-dragones-2",
      "name": "Calle despues de entrada Dragones 2",
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
        "yaw": -0.0837216295768961,
        "pitch": 0.05256343480598602,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": -0.024196948674745755,
          "pitch": 0.24132989792056314,
          "rotation": 0,
          "target": "3-calle-a-sector-1-y-sector-3"
        },
        {
          "yaw": -2.2395904889841294,
          "pitch": 0.11598663330070025,
          "rotation": 0,
          "target": "1-calle-despues-de-entrada-dragones-1"
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
          "yaw": -2.6974000528191695,
          "pitch": 0.14082486381154524,
          "rotation": 0,
          "target": "2-calle-despues-de-entrada-dragones-2"
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
