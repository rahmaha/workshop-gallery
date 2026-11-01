// Dibuat otomatis oleh update-data.html dari Data_Submission_E-Portofolio_Workshop_bersih.csv
// Kolom: nama | link | judul karya | kelas | kategori | gambar
const DATA_KARYA = `
Afra Natavasa Prasetyan | https://afranatavasaprasetyan.my.canva.site/ |  | XII GP A | GP | img/01.jpg
Rossa Nur Amalia | https://stembayo.my.canva.site/rossaportofolio |  | X SIJA B | SIJA | img/02.jpg
Putri Cahaya Pratiwi | https://portofoliodigitalxxx.my.canva.site/ |  | 10 TKI B | TKI | img/03.jpg
Felicia Anindya Putri | https://puffin-9ffpg8.my.canva.site/ |  | X GEOLOGI PERTAMBANGAN A | GP | img/04.jpg
Enrico Adnan Sulaeman | https://stembayo.my.canva.site/salinan-template-02 |  | 11 TEK-A | TEK | img/05.jpg
Ibnu Inayat | https://stembayo.my.canva.site/salinan-template-01 |  | 10 KGS | KGS | img/06.jpg
Ahmad Awan Dawud | https://stembayo.my.canva.site/dahwuvuf8oq |  | 10 KA A | KA | img/07.jpg
Abigail Anindita Putri | https://canva.link/8voxi3dq4onxfhd |  | XI KA A | KA | img/08.jpg
Ahmad Syauqi Nur Muharram | https://stembayo.my.canva.site/workshop |  | X DPIB | DPIB | img/10.jpg
Josemaria Escriva Bryan Susanto | https://stembayo.my.canva.site/dahwumny4ya |  | 11 KA B | KA | img/11.jpg
Raditya Brian Seva | https://canva.link/8a2as5ghcycg68f |  | 11 TEK B | TEK | img/12.jpg
Anindita Farah Aqila | https://stembayo.my.canva.site/portofolio-anindita |  | XI Kimia Analisis A | KA | img/14.jpg
Rifqi Al-ziqran Simanjuntak | https://rifqiibismilahitb.my.canva.site/ |  | 11 GP B | GP | img/15.jpg
Radhitya Ikhwan Narraya | https://stembayo.my.canva.site/dahwuwqjaiu |  | 11 TP B | TP | img/16.jpg
Navita Abigail Florencia | https://canva.link/30aid8tor6p4rfk |  | XI TP B | TP | img/17.jpg
Bimasakti Manusakerti | https://flamingo-t8bltz.my.canva.site/ |  | X GP A | GP | img/18.jpg
Fikri putra Zuliansyah | https://portofolioerfg.my.canva.site/ |  | XI TEK A | TEK | img/19.jpg
Fabian Alifa Nugraha | https://fabianalifanugraha.my.canva.site/ |  | 12 GP A | GP | img/20.jpg
Raihan Hidayatullah | https://stembayo.my.canva.site/raihanheologisukses- |  | XI GP B | GP | img/21.jpg
Eka vrilla Saputri | https://canva.link/946mtto8tltupzo |  | XI Kimia Analisis A | KA | img/22.jpg
Naomira Noor Sakinah Wiyono | https://stembayo.my.canva.site/copy-of-template-01 |  | XI KA B | KA | img/23.jpg
Mayta Kamaya | https://canva.link/ka6b32mequuhhqi |  | 12 SIJA B | SIJA | img/24.jpg
Seisya Handoko | https://stembayo.my.canva.site/dahwuuwhezy |  | XI DPIB | DPIB | img/25.jpg
Meylvin Alviano Aryasuta | https://stembayo.my.canva.site/meylvingeoitb2029 |  | 11 GP B | GP | img/26.jpg
Amanda diva safira | https://canva.link/57w1j5h8vnv8pxq |  | 11 kgs | KGS | img/27.jpg
Adnan Berkah Nur Putra | https://adnan-berkah-nur-putra.my.canva.site/ |  | XI TITL | TITL | img/28.jpg
Siti Nurazizah | https://canva.link/hhg9e2ead46mzsh |  | XI TKI B | TKI | img/29.jpg
Nasywan Rafif Awali | https://stembayo.my.canva.site/dahwuoiepwc |  | 11 Kimia Analisis B | KA | img/30.jpg
Awalliyah Yasmin Fathanmubina Nugraha | https://canva.link/j17s03lvfjpu5hi |  | XI GP A | GP | img/31.jpg
Farisha Putri Nurkhasanah | https://owl-0dmmj6.my.canva.site/ |  | 11 GP A | GP | img/32.jpg
Gadiza Syifa Atlanta | https://stembayo.my.canva.site/dahwunsmqku |  | XI GP A | GP | img/33.jpg
Rafa Putra Pratama | https://stembayo.my.canva.site/dahwuurhape |  | 11 TP B | TP | img/34.jpg
Naufal Maghani Pratama | https://stembayo.my.canva.site/dahwumt-v6m |  | 11 TP B | TP | img/36.jpg
Zanuar Dwi Safitri | https://lilikkis.my.canva.site/salinan-template-01 |  | 10 TKI | TKI | img/37.jpg
`;
