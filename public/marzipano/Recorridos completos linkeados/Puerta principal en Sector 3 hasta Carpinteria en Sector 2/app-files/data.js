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
        "yaw": -0.6783530058813305,
        "pitch": 0.029111576909375714,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": -0.9993324631747988,
          "pitch": 0.05564320847056692,
          "rotation": 0,
          "target": "1-sector-3-a-talleres"
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
      "id": "1-sector-3-a-talleres",
      "name": "Sector 3 a talleres",
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
          "yaw": -0.05697660462405274,
          "pitch": 0.17745614812057298,
          "rotation": 0,
          "target": "2-patio-talleres"
        },
        {
          "yaw": 1.6329552416696238,
          "pitch": 0.203607504223017,
          "rotation": 0,
          "target": "0-entrada-principal"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-patio-talleres",
      "name": "Patio talleres",
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
        "yaw": 1.4586711658059093,
        "pitch": 0.04998362597115147,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": -0.291770220228571,
          "pitch": 0.15707960281934596,
          "rotation": 0,
          "target": "1-sector-3-a-talleres"
        },
        {
          "yaw": 1.649232042209066,
          "pitch": 0.1700037357316404,
          "rotation": 0,
          "target": "3-carpinteria---foto-1"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-carpinteria---foto-1",
      "name": "Carpinteria - Foto 1",
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
          "yaw": -0.005239340228133216,
          "pitch": 0.2370004939390853,
          "rotation": 0,
          "target": "4-carpinteria---foto-2"
        },
        {
          "yaw": 1.9725045782082695,
          "pitch": 0.06868126306558331,
          "rotation": 0,
          "target": "2-patio-talleres"
        }
      ],
      "infoHotspots": [
        {
          "yaw": 1.9727645119630877,
          "pitch": 0.2240852092435759,
          "title": "Puerta de acceso",
          "text": "Ingreso y egreso del taller."
        }
      ]
    },
    {
      "id": "4-carpinteria---foto-2",
      "name": "Carpinteria - Foto 2",
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
          "yaw": 0.228638544115233,
          "pitch": 0.24730413853294309,
          "rotation": 0,
          "target": "3-carpinteria---foto-1"
        }
      ],
      "infoHotspots": []
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
