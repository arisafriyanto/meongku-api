<h1 align="center">Meongku Web Service</h1>

<div align="center">

[![CC Member](https://img.shields.io/github/contributors/arisafriyanto/meongku-api?color=blue)](#cc-member)
[![Dependency](https://img.shields.io/node/v/@hapi/hapi)](#dependency)
[![Issue](https://img.shields.io/github/issues/arisafriyanto/meongku-api)](https://github.com/arisafriyanto/meongku-api/issues)
[![Pull Request](https://img.shields.io/github/issues-pr/arisafriyanto/meongku-api)](https://github.com/arisafriyanto/meongku-api/pulls)
[![License](https://img.shields.io/github/license/arisafriyanto/meongku-api?color=blue)](https://github.com/arisafriyanto/meongku-api/blob/develop/LICENSE)

</div>

Meongku Web Service adalah sebuah layanan web yang dapat mengidentifikasi ras kucing secara akurat, memberikan informasi spesifik tentang ras kucing, dan merekomendasikan produk makanan. Layanan ini dirancang untuk membantu pemilik hewan peliharaan memahami kucing mereka dengan lebih baik dan memberikan perawatan yang sesuai dengan kebutuhan hewan peliharaan mereka.

Hal pertama yang perlu Anda ketahui adalah bahwa layanan ini memerlukan otentikasi untuk mengakses setiap layanan. Anda perlu mendaftar untuk menggunakan layanan ini. Anda dapat mendaftar pada service register. Anda dapat register menggunakan nama, email, kata sandi, dan nomor telepon. Setelah berhasil mendaftar, Anda dapat menggunakan email dan kata sandi yang Anda daftarkan untuk melakukan login. Jika Anda memiliki ide untuk meningkatkan keamanan layanan ini, silakan hubungi kami.

> Base url of this service is: http://localhost:3000

## Instalasi

- Clone repository ini dengan perintah berikut: \
  `git clone https://github.com/arisafriyanto/meongku-api.git`

- Masuk ke directori repository dengan perintah: \
  `cd meongku-api`

- Jalankan perintah berikut untuk menginstal depedency: \
  `npm install`

- Simpan `serviceAccountKey.json` di root directory yang didapat dari project Firebase Anda.

- Buat file `.env` di root directory dan isi dengan variabel firebase sebagai berikut: \

  <pre>
  PORT=3000
  API_KEY=YOUR_API_KEY
  AUTH_DOMAIN=YOUR_AUTH_DOMAIN
  PROJECT_ID=YOUR_PROJECT_ID
  STORAGE_BUCKET=YOUR_STORAGE_BUCKET
  MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
  APP_ID=YOUR_APP_ID
  MEASUREMENT_ID=YOUR_MEASUREMENT_ID
  NODE_ENV=localhost</pre>

Pastikan konfigurasi `.env` dengan nilai yang sesuai dari projek Firebase Anda.

## The service available

- **Authentications**

  | Endpoint  | Method |                    Description                     |
  | :-------: | :----: | :------------------------------------------------: |
  | /register |  POST  |    HTTP POST REQUEST post data to our Firestore    |
  |  /login   |  POST  | HTTP POST REQUEST to login with email and password |
  |  /logout  |  POST  |       HTTP POST REQUEST to logging out user        |

  <pre>POST /register</pre>
  <pre>POST /login</pre>
  <pre>POST /logout</pre>

- **Home**

  | Endpoint | Method |              Description              |
  | :------: | :----: | :-----------------------------------: |
  |    /     |  GET   |           HTTP GET REQUEST            |
  | /{any\*} |  GET   | HTTP GET REQUEST to url not available |

  <pre>GET /</pre>
  <pre>GET /{any*}</pre>

- **Users**

  |          Endpoint          | Method |              Description               |
  | :------------------------: | :----: | :------------------------------------: |
  |        /users/{uid}        |  GET   |            HTTP GET REQUEST            |
  |        /users/{uid}        |  PUT   | HTTP PUT REQUEST to edit profile user  |
  | /users/{uid}/edit-password |  PUT   | HTTP PUT REQUEST to edit user password |

  <pre>GET /users/{uid}</pre>
  <pre>PUT /users/{uid}</pre>
  <pre>PUT /users/{uid}/edit-password</pre>

- **Articles**

  |    Endpoint    | Method |              Description              |
  | :------------: | :----: | :-----------------------------------: |
  |   /articles    |  GET   |           HTTP GET REQUEST            |
  | /articles/{id} |  GET   | HTTP GET REQUEST to get article by id |

  <pre>GET /articles</pre>
  <pre>GET /articles/{id}</pre>

- **Cats**

  |  Endpoint  | Method |            Description            |
  | :--------: | :----: | :-------------------------------: |
  |   /cats    |  GET   |         HTTP GET REQUEST          |
  | /cats/{id} |  GET   | HTTP GET REQUEST to get cat by id |

  <pre>GET /cats</pre>
  <pre>GET /cats/{id}</pre>

- **Cat Food Recommendations**

  |         Endpoint          | Method |                     Description                      |
  | :-----------------------: | :----: | :--------------------------------------------------: |
  | /cat-food-recommendations |  POST  | HTTP POST REQUEST to get cat food product recommendation |

  <pre>POST /cat-food-recommendations</pre>

- **Cat Scanner**

  |   Endpoint   | Method |             Description              |
  | :----------: | :----: | :----------------------------------: |
  | /cat-scanner |  POST  | HTTP POST REQUEST to get cat details |

  <pre>GET /cat-scanner</pre>

## Authentications

Layanan ini menggunakan id token untuk otentikasi. Anda harus memiliki akun untuk mengakses layanan ini. Pertama, jika Anda belum memiliki akun, buatlah akun baru. Kemudian, login untuk mendapatkan id token untuk otentikasi. Anda perlu mengautentikasi diri Anda dengan email dan password. Jika autentikasi valid, Anda dapat menggunakan id token ini untuk mengakses layanan yang terproteksi. Jika tidak, Anda akan mendapatkan pesan kesalahan.

## Dependency

- [Hapi Server](https://www.npmjs.com/package/@hapi/hapi)
- [Hapi Boom](https://www.npmjs.com/package/@hapi/boom)
- [Firebase](https://www.npmjs.com/package/firebase)
- [Firebase Admin](https://www.npmjs.com/package/firebase-admin)
- [DotEnv](https://www.npmjs.com/package/dotenv)
- [Joi](https://www.npmjs.com/package/joi)
- [Nodemon](https://www.npmjs.com/package/nodemon)
