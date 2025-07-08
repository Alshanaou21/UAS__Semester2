# Project Setup Instructions

## Running Backend Server with Docker Compose

To ensure the backend server has the correct environment variables for database connection, run the backend server inside the docker container using docker-compose:

```bash
docker-compose up
```

This will start the database, backend, and frontend services with the correct environment variables.

## Running Backend Server Manually

If you want to run the backend server manually (outside of docker), you need to set the following environment variables in your terminal before starting the server:

- PGUSER=admin
- PGHOST=db (or localhost if running database locally)
- PGDATABASE=uasdb
- PGPASSWORD=admin123
- PGPORT=5432

For example, on Windows PowerShell:

```powershell
$env:PGUSER="admin"
$env:PGHOST="localhost"
$env:PGDATABASE="uasdb"
$env:PGPASSWORD="admin123"
$env:PGPORT="5432"
node uas-backend/server.js
```

Make sure your PostgreSQL database is running and accessible with these credentials.

## Summary

Running the backend server inside docker-compose is the recommended way to avoid environment variable issues and ensure all services run correctly.
