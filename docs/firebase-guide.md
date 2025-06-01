# Panduan Integrasi Firebase untuk ClipperCuts

Panduan ini menjelaskan cara menggunakan Firebase dalam proyek ClipperCuts Anda.

## Setup Selesai

Firebase sudah diatur dalam proyek ini dengan fitur-fitur berikut:

- **Authentication (Autentikasi)**: Login dengan email/password dan Google
- **Firestore Database**: Database NoSQL untuk menyimpan data aplikasi
- **Storage (Penyimpanan)**: Penyimpanan file untuk gambar dan aset lainnya
- **Analytics (Analitik)**: Pelacakan penggunaan dan analitik

## Konfigurasi Firebase

Konfigurasi Firebase terletak di `lib/firebase.js`. File ini menginisialisasi layanan Firebase dan mengekspornya untuk digunakan di seluruh aplikasi.

## Halaman Demo

Halaman demo tersedia di `/firebase-demo` yang mendemonstrasikan fungsi utama Firebase:
- Autentikasi (login, register, logout)
- Operasi database Firestore (CRUD)
- Storage untuk upload file

## Cara Menggunakan Firebase dalam Komponen Anda

### 1. Autentikasi

Import helper autentikasi:

```javascript
import { 
  loginUser, 
  registerUser, 
  loginWithGoogle, 
  logoutUser,
  subscribeToAuthChanges 
} from '../utils/firebaseHelpers';
```

Contoh penggunaan:

```javascript
// Mendaftarkan pengguna baru
const user = await registerUser(email, password);

// Login dengan email/password
await loginUser(email, password);

// Login dengan Google
await loginWithGoogle();

// Logout
await logoutUser();

// Memantau perubahan status autentikasi
useEffect(() => {
  const unsubscribe = subscribeToAuthChanges((user) => {
    if (user) {
      // Pengguna sudah login
      console.log('Pengguna sudah login:', user.uid);
    } else {
      // Pengguna sudah logout
      console.log('Pengguna sudah logout');
    }
  });
  
  // Membersihkan subscription
  return () => unsubscribe();
}, []);
```

### 2. Database Firestore

Import helper Firestore:

```javascript
import { 
  addDocument, 
  getDocument, 
  getAllDocuments, 
  queryDocuments, 
  updateDocument, 
  deleteDocument 
} from '../utils/firebaseHelpers';
```

Contoh penggunaan:

```javascript
// Nama koleksi
const collectionName = 'appointments';

// Menambahkan dokumen
const docId = await addDocument(collectionName, {
  customerName: 'John Doe',
  service: 'Potong Rambut',
  date: new Date()
});

// Mendapatkan dokumen berdasarkan ID
const appointment = await getDocument(collectionName, docId);

// Mendapatkan semua dokumen dalam koleksi
const allAppointments = await getAllDocuments(collectionName);

// Query dokumen dengan filter
const todaysAppointments = await queryDocuments(
  collectionName,
  [
    { field: 'date', operator: '>=', value: todayStart },
    { field: 'date', operator: '<=', value: todayEnd }
  ],
  { field: 'date', direction: 'asc' },
  10 // batas 10 hasil
);

// Memperbarui dokumen
await updateDocument(collectionName, docId, {
  status: 'confirmed'
});

// Menghapus dokumen
await deleteDocument(collectionName, docId);
```

### 3. Penyimpanan (Storage)

Import helper Storage:

```javascript
import { 
  uploadFile, 
  getFileURL, 
  deleteFile 
} from '../utils/firebaseHelpers';
```

Contoh penggunaan:

```javascript
// Upload file (misalnya, dari input file)
const file = event.target.files[0];
const result = await uploadFile('profile-images', file);

// Objek result berisi:
// - fileName: Nama file di storage
// - fullPath: Path lengkap di storage
// - downloadURL: URL untuk mengakses file

// Mendapatkan URL download untuk file
const url = await getFileURL('profile-images/image123.jpg');

// Menghapus file
await deleteFile('profile-images/image123.jpg');
```

## Aturan Keamanan

Untuk lingkungan produksi, pastikan untuk mengatur aturan keamanan yang tepat di konsol Firebase untuk:

1. Database Firestore
2. Storage
3. Authentication

## Penanganan Error

Semua fungsi helper Firebase dibungkus dalam blok try/catch. Dalam komponen Anda, pastikan untuk menangani error dengan tepat:

```javascript
try {
  await loginUser(email, password);
  // Penanganan sukses
} catch (error) {
  // Penanganan error
  console.error('Error login:', error.message);
}
```

## Sumber Tambahan

- [Dokumentasi Firebase](https://firebase.google.com/docs)
- [Konsol Firebase](https://console.firebase.google.com/)
- [Contoh Next.js + Firebase](https://github.com/vercel/next.js/tree/canary/examples/with-firebase) 