# Setup Local MySQL Database

Since you have the **MySQL Command Line Client**, follow these steps:

1.  **Open** "MySQL Command Line Client" from your Start Menu.
2.  Enter your **Password** when prompted (remember this password!).
3.  Run this command exactly:
    ```sql
    CREATE DATABASE hrms_lite;
    ```
4.  If successful, it will say `Query OK, 1 row affected`.

## Next Step: Update Connection String

Open your `.env` file in this project and update it to:

```env
# Replace 'YOUR_PASSWORD' with the password you typed in step 2
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/hrms_lite"
```

Once you have done this, I will run the schema push command to verify the connection.
