# eth.shop.app

Nodemon : Oto sunucu run. Geliştirilirken kullanıldığı için devDependencies kısmın da yer alıyor. ^ işareti ise daha sonradan sürümü yükseltilebileceği için koyuluyor. Bu sebeple , install ederken ona göre edilir. Package.json kısmında oto başlatılması için script eklenir. ["start": "nodemon app.js"] eklenir ve npm start ile başlatılır. Uygulamayı nodemon başlatır.

Express : package.json kısmın da dependencies kısmın da bulunuyor çünkü sadece dev kısmın da değil projenin ayağa kalkması için de lazım.

Prettier : extencion olduğu için ^ kısmı bulunmuyor.