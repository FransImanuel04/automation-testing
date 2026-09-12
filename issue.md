# Issue: Membuat Website Task List Sederhana untuk Cypress

## Tujuan

Membuat website **Task List** sederhana menggunakan HTML, CSS, dan JavaScript vanilla. Website ini digunakan sebagai target untuk latihan dan pengujian automation menggunakan Cypress.

## Batasan Teknologi

- HTML5
- CSS3
- JavaScript vanilla
- Tanpa framework atau library tambahan
- Tanpa backend dan database
- Data task disimpan sementara di browser menggunakan `localStorage`

## Fitur Utama

1. Menampilkan judul halaman dan form tambah task.
2. Menambahkan task baru melalui input dan tombol **Tambah**.
3. Menampilkan daftar task yang sudah ditambahkan.
4. Menandai task sebagai selesai atau belum selesai.
5. Menghapus task dari daftar.
6. Menampilkan jumlah task aktif dan jumlah task selesai.
7. Menampilkan pesan validasi jika input task kosong.
8. Mempertahankan data task setelah halaman di-refresh menggunakan `localStorage`.

## Struktur File

```text
index.html
style.css
script.js
```

## Rancangan Halaman

- Header berisi nama aplikasi: **Task List**.
- Area form berisi:
  - input teks untuk nama task
  - tombol **Tambah**
- Area statistik berisi jumlah task aktif dan selesai.
- Area daftar task berisi setiap task dengan:
  - checkbox status selesai
  - teks nama task
  - tombol hapus
- Area pesan kosong jika belum ada task.

## Aturan Perilaku

- Task tidak boleh ditambahkan jika input kosong atau hanya berisi spasi.
- Setelah task berhasil ditambahkan, input dikosongkan dan fokus kembali ke input.
- Task baru berstatus belum selesai.
- Checkbox mengubah status task dan tampilan teks task.
- Tombol hapus menghapus task tanpa me-reload halaman.
- Statistik diperbarui setiap kali task ditambahkan, diubah, atau dihapus.
- Saat tidak ada task, daftar menampilkan pesan bahwa belum ada task.

## Selector untuk Cypress

Gunakan atribut `data-cy` agar selector test stabil dan tidak bergantung pada class CSS:

- `data-cy="task-input"` untuk input task
- `data-cy="add-task"` untuk tombol tambah
- `data-cy="task-list"` untuk container daftar task
- `data-cy="task-item"` untuk setiap item task
- `data-cy="task-checkbox"` untuk checkbox task
- `data-cy="delete-task"` untuk tombol hapus
- `data-cy="active-count"` untuk jumlah task aktif
- `data-cy="completed-count"` untuk jumlah task selesai
- `data-cy="empty-state"` untuk pesan daftar kosong
- `data-cy="validation-message"` untuk pesan validasi input

## Acceptance Criteria

- [ ] Website dapat dibuka dengan membuka `index.html` di browser.
- [ ] Hanya menggunakan HTML, CSS, dan JavaScript vanilla.
- [ ] Pengguna dapat menambahkan task valid.
- [ ] Input kosong menampilkan pesan validasi dan tidak membuat task baru.
- [ ] Pengguna dapat menandai task sebagai selesai.
- [ ] Pengguna dapat menghapus task.
- [ ] Jumlah task aktif dan selesai selalu akurat.
- [ ] Pesan daftar kosong tampil saat tidak ada task.
- [ ] Task tetap tersedia setelah halaman di-refresh.
- [ ] Elemen penting memiliki selector `data-cy` yang stabil.
- [ ] Tampilan tetap dapat digunakan pada desktop dan layar mobile.

## Skenario Pengujian Cypress yang Disarankan

1. Membuka halaman dan memastikan judul serta pesan daftar kosong tampil.
2. Mengirim form dengan input kosong dan memastikan pesan validasi tampil.
3. Menambahkan satu task dan memastikan task tampil di daftar.
4. Menambahkan beberapa task dan memastikan jumlah task aktif sesuai.
5. Menandai task sebagai selesai dan memastikan jumlah statistik berubah.
6. Menghapus task dan memastikan task tidak lagi tampil.
7. Me-refresh halaman dan memastikan task yang tersimpan tetap tampil.
8. Memastikan task dengan nama yang mengandung spasi di awal atau akhir disimpan dalam bentuk yang sudah dirapikan.

## Definition of Done

- Semua acceptance criteria terpenuhi.
- Tidak ada error JavaScript di browser console.
- Skenario pengujian Cypress utama berhasil dijalankan.
- Kode mudah dibaca dan dipisahkan ke dalam file HTML, CSS, dan JavaScript.
