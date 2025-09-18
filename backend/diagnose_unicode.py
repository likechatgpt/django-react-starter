# diagnose_unicode.py
# Diagnose the exact source of the Unicode error

import os
import sys
import locale
import psycopg2


def check_environment():
    """Check environment encoding settings"""
    print("Environment Encoding Check")
    print("=" * 60)

    print(f"Python version: {sys.version}")
    print(f"Default encoding: {sys.getdefaultencoding()}")
    print(f"File system encoding: {sys.getfilesystemencoding()}")
    print(f"Preferred encoding: {locale.getpreferredencoding()}")

    # Check environment variables
    print(f"\nEnvironment variables:")
    print(f"LANG: {os.environ.get('LANG', 'Not set')}")
    print(f"LC_ALL: {os.environ.get('LC_ALL', 'Not set')}")
    print(f"PYTHONIOENCODING: {os.environ.get('PYTHONIOENCODING', 'Not set')}")

    # Check Windows-specific
    if sys.platform == 'win32':
        import ctypes
        print(f"\nWindows Code Page: {ctypes.windll.kernel32.GetConsoleCP()}")
        print(f"Windows Output Code Page: {ctypes.windll.kernel32.GetConsoleOutputCP()}")


def test_connection_step_by_step():
    """Test connection building parameters one by one"""
    print("\n" + "=" * 60)
    print("Step-by-step connection test")
    print("-" * 60)

    # Test each parameter individually
    params = {
        "host": "localhost",
        "port": "5432",
        "database": "postgres",
        "user": "postgres",
        "password": "731408"
    }

    # Test encoding each parameter
    for key, value in params.items():
        try:
            encoded = value.encode('utf-8')
            decoded = encoded.decode('utf-8')
            print(f"✓ {key}: '{value}' - UTF-8 encoding OK")
        except UnicodeError as e:
            print(f"✗ {key}: '{value}' - UTF-8 encoding failed: {e}")

    # Try connection with minimal parameters
    print("\nTrying minimal connection (just host and user)...")
    try:
        # This will fail for auth, but shouldn't have Unicode error
        conn = psycopg2.connect(host="localhost", user="postgres")
    except psycopg2.OperationalError as e:
        if "Unicode" not in str(e):
            print("✓ No Unicode error with minimal params (auth failed as expected)")
        else:
            print(f"✗ Unicode error even with minimal params: {e}")
    except UnicodeDecodeError as e:
        print(f"✗ Unicode error with minimal params: {e}")

    # Try with password
    print("\nTrying with password...")
    try:
        conn = psycopg2.connect(
            host="localhost",
            port="5432",
            user="postgres",
            password="731408",
            database="postgres"
        )
        print("✓ Connection successful!")
        conn.close()
    except UnicodeDecodeError as e:
        print(f"✗ Unicode error: {e}")
        print(f"  Bytes around error: {repr(e.object[max(0, e.start - 10):min(len(e.object), e.end + 10)])}")
    except psycopg2.OperationalError as e:
        print(f"✗ Operational error: {e}")


def test_dsn_format():
    """Test using DSN format"""
    print("\n" + "=" * 60)
    print("DSN Format Test")
    print("-" * 60)

    # Try DSN format
    dsn = "postgresql://postgres:731408@localhost:5432/postgres"
    print(f"DSN: postgresql://postgres:***@localhost:5432/postgres")

    try:
        conn = psycopg2.connect(dsn)
        print("✓ DSN connection successful!")
        conn.close()
    except UnicodeDecodeError as e:
        print(f"✗ Unicode error with DSN: {e}")
    except Exception as e:
        print(f"✗ Error: {e}")


def check_postgresql_config():
    """Try to check PostgreSQL configuration if we can connect"""
    print("\n" + "=" * 60)
    print("PostgreSQL Configuration (if connection works)")
    print("-" * 60)

    try:
        # Try with explicit client_encoding
        conn = psycopg2.connect(
            host="localhost",
            port="5432",
            database="postgres",
            user="postgres",
            password="731408",
            options="-c client_encoding=UTF8"
        )

        cur = conn.cursor()

        # Check various encodings
        queries = [
            ("Server encoding", "SHOW server_encoding"),
            ("Client encoding", "SHOW client_encoding"),
            ("Database encoding", "SELECT pg_encoding_to_char(encoding) FROM pg_database WHERE datname = 'postgres'"),
        ]

        for label, query in queries:
            cur.execute(query)
            result = cur.fetchone()
            print(f"{label}: {result[0]}")

        cur.close()
        conn.close()

    except Exception as e:
        print(f"Could not check PostgreSQL config: {e}")


if __name__ == "__main__":
    check_environment()
    test_connection_step_by_step()
    test_dsn_format()
    check_postgresql_config()

    print("\n" + "=" * 60)
    print("\nDiagnosis complete.")
    print("\nIf you see Unicode errors above, the issue might be:")
    print("1. Windows system locale (try changing to English/UTF-8)")
    print("2. PostgreSQL installation encoding issue")
    print("3. psycopg2 version incompatibility")
    print("\nTry reinstalling psycopg2:")
    print("  pip uninstall psycopg2")
    print("  pip install psycopg2-binary")