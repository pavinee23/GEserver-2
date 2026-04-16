# GOEUN SERVER HUB

เว็บเซิร์ฟเวอร์ตัวอย่างสำหรับใช้เป็น

- หน้าโปรโมตบริการของผู้พัฒนาระบบ
- ศูนย์รวมลิงก์เข้าสู่หน้าระบบของลูกค้าหลายราย
- เว็บที่ดึงข้อมูลลูกค้าและบริการจากฐานข้อมูล MySQL

## สิ่งที่มีในโปรเจกต์

- หน้าแรก `/` สำหรับโปรโมตบริการและแสดงรายชื่อพอร์ทัลลูกค้า
- หน้ารวมลูกค้า `/clients`
- หน้ารายลูกค้า `/portal/<slug>`
- ลิงก์ redirect เข้าระบบจริง `/go/<slug>`
- API พื้นฐาน `/api/profile`, `/api/services`, `/api/clients`
- Health check `/health`
- การเชื่อมต่อ MySQL ผ่าน `mysql-connector-python`
- การสร้าง database, tables และ seed ข้อมูลตัวอย่างอัตโนมัติเมื่อแอปเริ่มทำงาน

## โครงสร้างไฟล์

```text
.
├── app.py
├── database.py
├── frontend/
│   ├── next.config.mjs
│   ├── package.json
│   ├── public/
│   └── src/
├── requirements.txt
├── templates.py
├── static/
│   ├── app.js
│   └── styles.css
└── tests/
    └── test_app.py
```

## ติดตั้ง dependency

```bash
python3 -m pip install -r requirements.txt
```

## ตั้งค่า MySQL

ระบบอ่านค่าจาก environment variables เหล่านี้

```bash
export MYSQL_HOST=127.0.0.1
export MYSQL_PORT=3306
export MYSQL_USER=root
export MYSQL_PASSWORD=your_password
export MYSQL_DATABASE=goeun_server_hub
```

หมายเหตุ:

- user ที่ใช้เชื่อมต่อควรมีสิทธิ์สร้าง database และ table ได้
- ถ้า `MYSQL_DATABASE` ยังไม่มี ระบบจะพยายามสร้างให้อัตโนมัติ

## วิธีรัน

```bash
python3 app.py
```

จากนั้นเปิด `http://127.0.0.1:8000`

หากต้องการเปลี่ยน host หรือ port:

```bash
HOST=0.0.0.0 PORT=8080 python3 app.py
```

## Frontend ใหม่ด้วย Next.js + React + Bootstrap

โปรเจกต์นี้มี frontend รุ่นใหม่อยู่ในโฟลเดอร์ `frontend/` สำหรับใช้หน้าบ้านที่ดูทันสมัยและ professional กว่าเดิม โดยยังดึงข้อมูลจาก Python backend เดิมผ่าน proxy ของ Next

### ติดตั้ง frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
```

### รันแบบ full stack ระหว่างพัฒนา

เปิด 2 terminal

Terminal 1 สำหรับ backend:

```bash
cd /home/pavinee/GEserver
MYSQL_HOST=localhost MYSQL_PORT=3306 MYSQL_USER=goeun_app MYSQL_PASSWORD='Goeun@1234' MYSQL_DATABASE=goeun_server_hub python3 app.py
```

Terminal 2 สำหรับ frontend:

```bash
cd /home/pavinee/GEserver/frontend
npm run dev
```

จากนั้นเปิด:

- frontend ใหม่ที่ `http://127.0.0.1:3000`
- backend เดิมที่ `http://127.0.0.1:8000`

ถ้าจะ build frontend สำหรับ production:

```bash
cd /home/pavinee/GEserver/frontend
npm run build
npm start
```

## ฐานข้อมูล

ตอนเริ่มรัน ระบบจะสร้างตาราง MySQL ต่อไปนี้ถ้ายังไม่มี:

- `site_profile`
- `services`
- `clients`

และจะ seed ข้อมูลตัวอย่างให้ทันทีถ้าตารางยังว่าง

## ทดสอบ

```bash
python3 -m unittest discover -s tests -v
```

และสำหรับ frontend:

```bash
cd frontend
npm run build
```

เทสต์ชุดนี้ mock ชั้นฐานข้อมูลไว้ เพื่อให้ตรวจสอบ route และการตอบสนองของเว็บได้แม้ไม่มี MySQL server ใน sandbox

## แนวทางต่อยอด

- เพิ่มระบบล็อกอินแอดมินสำหรับจัดการลูกค้า
- เพิ่มฟอร์ม CRUD สำหรับจัดการข้อมูลลูกค้าใน MySQL
- เพิ่ม SSL / reverse proxy เช่น Nginx สำหรับใช้งานจริง
- เชื่อมโดเมนจริงและใส่ลิงก์ระบบของลูกค้าแต่ละราย
