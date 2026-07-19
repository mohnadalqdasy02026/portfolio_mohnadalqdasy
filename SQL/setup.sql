-- ============================================
-- SUPABASE SETUP FOR PORTFOLIO
-- ============================================

-- 1️⃣ جدول بيانات الموقع
CREATE TABLE IF NOT EXISTS portfolio_data (
    id BIGSERIAL PRIMARY KEY,
    data_key TEXT UNIQUE NOT NULL DEFAULT 'main',
    data JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- أدخل البيانات الافتراضية
INSERT INTO portfolio_data (data_key, data) 
VALUES ('main', '{"projects":[],"certificates":[],"gallery":[],"testimonials":[],"content":{"hero":{"name":"Mohannad Mohammed Al-Qudsi","nameAr":"مهند محمد القدسي","titles":["Software Engineer","Desktop App Developer"],"titlesAr":["مهندس برمجيات","مطور تطبيقات سطح المكتب"],"description":"Passionate about building intelligent software.","descriptionAr":"شغوف ببناء برامج ذكية."},"about":{"biography":"Software engineer","biographyAr":"مهندس برمجيات","mission":"Building great software","missionAr":"بناء برامج رائعة","vision":"Leader in Arab world","visionAr":"رائد في العالم العربي","goals":"Digital transformation","goalsAr":"التحول الرقمي"},"contact":{"email":"mohannad@qudsi.dev","phone":"+967 783737425","location":"Sanaa Yemen","locationAr":"صنعاء اليمن","whatsapp":"+967 783737425"},"social":{"github":"","linkedin":"","facebook":"","instagram":""}}}')
ON CONFLICT (data_key) DO NOTHING;

-- 2️⃣ جدول المستخدمين
CREATE TABLE IF NOT EXISTS admin_users (
    id BIGSERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- أدخل المستخدم الافتراضي
INSERT INTO admin_users (email, password_hash, name, role)
VALUES ('admin@mohannad.dev', 'admin123', 'Mohannad', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 3️⃣ تفعيل Row Level Security
ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 4️⃣ سياسات الوصول
-- أي أحد يقدر يقرأ البيانات
CREATE POLICY "Public can read portfolio data" ON portfolio_data
    FOR SELECT USING (true);

-- أي أحد يقدر يعدل البيانات (من لوحة التحكم)
CREATE POLICY "Public can update portfolio data" ON portfolio_data
    FOR UPDATE USING (true);

-- أي أحد يقدر يدرج بيانات جديدة
CREATE POLICY "Public can insert portfolio data" ON portfolio_data
    FOR INSERT WITH CHECK (true);

-- admins يمكنهم قراءة كل المستخدمين
CREATE POLICY "Public can read admin_users" ON admin_users
    FOR SELECT USING (true);

-- أي أحد يقدر يسجل (للأمان نستخدم API route)
CREATE POLICY "Public can insert admin_users" ON admin_users
    FOR INSERT WITH CHECK (true);

-- ============================================
-- ملاحظة: للتحديث، استخدم Edge Functions أو
-- غير السياسات حسب احتياجك
-- ============================================
