import sys
import os
from pathlib import Path

# Add backend directory to Python path so we can import app.main
# Vercel Serverless Functions execute in the api/ directory
root_dir = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root_dir / "backend"))

from app.main import app
