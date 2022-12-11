import subprocess
import os

path = os.getcwd()
script_path = f"{path}/scripts/crawl.sh"
subprocess.call(['sh', script_path])
