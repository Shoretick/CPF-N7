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
        "yaw": -0.1410435057374002,
        "pitch": 0.0018992900587093686,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": 0.03252833667244559,
          "pitch": -0.06267012950541329,
          "rotation": 0,
          "target": "1-pasillo-1---sector-3"
        }
      ],
      "infoHotspots": [
        {
          "yaw": 0.031569133342388866,
          "pitch": 0.0618315416542039,
          "title": "Puerta principal",
          "text": "Acceso principal al Centro de Formación Profesional N.º 7. <br><span data-start=\"1155\" data-end=\"1186\">El acceso cuenta con rampa.</span>"
        }
      ]
    },
    {
      "id": "1-pasillo-1---sector-3",
      "name": "Pasillo 1 - Sector 3",
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
        "yaw": -0.09617120368132248,
        "pitch": 0.012515103525235105,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": -2.863508871060068,
          "pitch": 0.20312870387308024,
          "rotation": 0,
          "target": "0-entrada-principal"
        },
        {
          "yaw": 0.1682577792367077,
          "pitch": 0.09829988005929025,
          "rotation": 0,
          "target": "2-pasillo-entrada-a-patio-cubierto---sector-3"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-pasillo-entrada-a-patio-cubierto---sector-3",
      "name": "Pasillo entrada a patio cubierto - Sector 3",
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
        "yaw": 0.008892077604164328,
        "pitch": 0.007509062115138576,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": 1.7666946190617452,
          "pitch": 0.21539098894881725,
          "rotation": 0,
          "target": "1-pasillo-1---sector-3"
        },
        {
          "yaw": 0.15970969029289073,
          "pitch": 0.06754844824205719,
          "rotation": 0,
          "target": "3-patio-cubierto---sector-3"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-patio-cubierto---sector-3",
      "name": "Patio cubierto - Sector 3",
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
        "yaw": -1.5409810451261237,
        "pitch": -0.012515103525233329,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": -1.6312997577637596,
          "pitch": 0.2164276339325344,
          "rotation": 0,
          "target": "4-aula-3---sector-4"
        },
        {
          "yaw": 0.8975588544263147,
          "pitch": 0.10483765992741567,
          "rotation": 0,
          "target": "2-pasillo-entrada-a-patio-cubierto---sector-3"
        }
      ],
      "infoHotspots": [
        {
          "yaw": -1.083802954382966,
          "pitch": 0.09715186377766294,
          "title": "Buffet",
          "text": "Espacio destinado a la venta de comidas y bebidas."
        }
      ]
    },
    {
      "id": "4-aula-3---sector-4",
      "name": "Aula 3 - Sector 4",
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
        "yaw": -0.01781108043297941,
        "pitch": -0.0025030207050491526,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": -0.052972549399306956,
          "pitch": 0.23946233447052023,
          "rotation": 0,
          "target": "5-aula---sector-4"
        },
        {
          "yaw": -1.523722151573736,
          "pitch": 0.14306763784057708,
          "rotation": 0,
          "target": "3-patio-cubierto---sector-3"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "5-aula---sector-4",
      "name": "Aula - Sector 4",
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
        "yaw": -0.172458104423999,
        "pitch": 0.02987177568641286,
        "fov": 1.325599857056214
      },
      "linkHotspots": [
        {
          "yaw": -2.590384610257267,
          "pitch": 0.10821326701114842,
          "rotation": 0,
          "target": "4-aula-3---sector-4"
        }
      ],
      "infoHotspots": [
        {
          "yaw": -2.5833109446504743,
          "pitch": 0.37223059286890603,
          "title": "Puerta de acceso",
          "text": "Ingreso y egreso del aula."
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
