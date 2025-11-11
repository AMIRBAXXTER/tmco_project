from celery import shared_task
import subprocess, os, jdatetime, glob


@shared_task(queue="db_backup")
def backup_postgres_db():
    now = jdatetime.datetime.now()
    readable_date = now.strftime("%Y-%m-%d")

    backup_path = f"/backups/backup_{readable_date}.sql"

    pg_user = os.getenv("POSTGRES_USER", "tmco_project_user")
    pg_db = os.getenv("POSTGRES_DB", "tmco_project_db")
    pg_pass = os.getenv("POSTGRES_PASSWORD", "")
    pg_host = os.getenv("POSTGRES_HOST", "db")

    env = os.environ.copy()
    env["PGPASSWORD"] = pg_pass

    cmd = [
        "pg_dump",
        "-h", pg_host,
        "-U", pg_user,
        "-d", pg_db,
        "-f", backup_path
    ]
    subprocess.run(cmd, env=env, check=True)

    print(f"backup created: {backup_path}")

    backups = sorted(
        glob.glob("/backups/backup_*.sql"),
        key=os.path.getmtime,
        reverse=True
    )
    old_backups = backups[5:]
    for old in old_backups:
        os.remove(old)
        print(f"old backup removed: {old}")
