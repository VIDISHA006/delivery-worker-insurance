FROM python:3.11-slim

# System setup
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install ML dependencies and system libs
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Install Python requirements
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy source code
# We copy backend/app into app/app so that `app.main:app` works correctly
COPY backend/app ./app
COPY frontend ./frontend

# Create database volume directory
RUN mkdir -p /data
ENV GIGSHIELD_DB_PATH=/data/gigshield.db

# Expose port (7860 is default for Hugging Face Spaces, but Render uses PORT env var)
# We will use the PORT environment variable if set by the hosting platform, otherwise 7860
ENV PORT=7860
EXPOSE $PORT

# Run application using the unified port
CMD uvicorn app.main:app --host 0.0.0.0 --port $PORT --proxy-headers
