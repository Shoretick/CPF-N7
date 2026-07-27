var APP_DATA = {
  "scenes": [
    {
      "id": "0-entrada-principal",
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
        "yaw": -2.0015975306076346,
        "pitch": 0.03161459761442309,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": -2.328111401409462,
          "pitch": 0.07177805888790445,
          "rotation": 0,
          "target": "1-calle-a-sector-1-y-sector-3"
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
    },
    {
      "id": "1-calle-a-sector-1-y-sector-3",
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
        "yaw": 0.21638339867811318,
        "pitch": -0.03241269398666624,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": 1.4727613413131264,
          "pitch": 0.10930985501538437,
          "rotation": 0,
          "target": "0-entrada-principal"
        },
        {
          "yaw": 0.0538039290207486,
          "pitch": 0.12949613492657264,
          "rotation": 0,
          "target": "2-entrada-sector-1"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-entrada-sector-1",
      "name": "Entrada Sector 1",
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
          "yaw": -0.10564914048511653,
          "pitch": 0.14542801035499053,
          "rotation": 0,
          "target": "3-taller-energia-pasillo---sector-1"
        },
        {
          "yaw": -2.4259436821861726,
          "pitch": 0.09152369359020085,
          "rotation": 0,
          "target": "1-calle-a-sector-1-y-sector-3"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-taller-energia-pasillo---sector-1",
      "name": "Taller energia pasillo - Sector 1",
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
          "yaw": 0.22225757637534116,
          "pitch": 0.2037982322379559,
          "rotation": 0,
          "target": "4-taller-energia---sector-1"
        },
        {
          "yaw": -1.2562555933414004,
          "pitch": 0.16658688228648622,
          "rotation": 0,
          "target": "2-entrada-sector-1"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "4-taller-energia---sector-1",
      "name": "Taller energia - Sector 1",
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
        "yaw": -1.0418748996278797,
        "pitch": -0.0715908990569627,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": 0.010358607223619032,
          "pitch": 0.033490101819250384,
          "rotation": 0,
          "target": "3-taller-energia-pasillo---sector-1"
        }
      ],
      "infoHotspots": [
        {
          "yaw": 0.016715010011338904,
          "pitch": 0.19254203947835613,
          "title": "Puerta de acceso",
          "text": "Ingreso y egreso del taller."
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
