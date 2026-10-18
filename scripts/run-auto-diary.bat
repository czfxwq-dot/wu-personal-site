@echo off
chcp 65001 >nul
cd /d "C:\Users\czfxw\Desktop\claude项目\wu-personal-site\scripts"
python auto-diary.py >> auto-diary.log 2>&1
