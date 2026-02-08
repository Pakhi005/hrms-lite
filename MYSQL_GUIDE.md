# How to Setup MySQL for HRMS Lite

You have two options: **Local** (Recommended for speed/reliability) or **Cloud** (Easier setup, requires internet).

## Option A: Local MySQL (XAMPP) - *Easiest for Windows*
1.  **Download XAMPP**: [https://www.apachefriends.org/download.html](https://www.apachefriends.org/download.html)
2.  **Install**: Run the installer. Ensure "MySQL" is checked.
3.  **Start Server**: Open **XAMPP Control Panel** and click **Start** next to **MySQL**.
4.  **Create Database**:
    - Open your browser to `http://localhost/phpmyadmin`
    - Click **New** (sidebar).
    - Database name: `hrms_lite`
    - Click **Create**.
5.  **Your Connection String**:
    ```
    mysql://root:@localhost:3306/hrms_lite
    ```
    *(Note: Default XAMPP root password is empty. If you set one, it's `mysql://root:PASSWORD@localhost:3306/hrms_lite`)*

## Option B: Cloud MySQL (Aiven / TiDB)
If you can't install XAMPP, use a free cloud tier.
1.  Go to [Aiven.io](https://aiven.io/) or [TiDB Cloud](https://tidbcloud.com/).
2.  Sign up and create a free **MySQL** service.
3.  Copy the **Service URI** (Connection String).

---

## Next Step
Once you have your connection string (URL), paste it into your `.env` file like this:

```env
DATABASE_URL="mysql://root:@localhost:3306/hrms_lite"
```
