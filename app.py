from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from datetime import datetime, timedelta
import threading
import time

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # セッション管理用

# タスク進捗・リマインダー用のグローバル変数
reminders = []

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        goals = request.form.getlist('goals')
        session['goals'] = [g for g in goals if g.strip()]
        return redirect(url_for('smart'))
    return render_template('index.html')

@app.route('/smart', methods=['GET', 'POST'])
def smart():
    goals = session.get('goals', [])
    if not goals:
        return redirect(url_for('index'))
    # SMART化＆優先度付け（仮実装）
    smart_goals = []
    for idx, g in enumerate(goals):
        smart_goals.append({
            'original': g,
            'smart': f"{g}を今日中に達成する",
            'priority': 10 - idx,
            'estimate': 25
        })
    session['smart_goals'] = smart_goals
    return render_template('smart.html', smart_goals=smart_goals)

@app.route('/schedule', methods=['GET', 'POST'])
def schedule():
    smart_goals = session.get('smart_goals', [])
    if not smart_goals:
        return redirect(url_for('index'))
    # タスク分解＆スケジュール（仮実装）
    schedule = []
    time_slots = ['朝', '午前', '昼', '夕方', '夜']
    for i, g in enumerate(smart_goals):
        schedule.append({
            'time': time_slots[i % len(time_slots)],
            'task': g['smart'],
            'goal_num': i+1,
            'status': '🔄'
        })
    session['schedule'] = schedule
    return render_template('schedule.html', schedule=schedule)

@app.route('/complete_task', methods=['POST'])
def complete_task():
    idx = int(request.form['idx'])
    schedule = session.get('schedule', [])
    if 0 <= idx < len(schedule):
        schedule[idx]['status'] = '✅'
        session['schedule'] = schedule
    return redirect(url_for('schedule'))

@app.route('/reflection', methods=['GET', 'POST'])
def reflection():
    schedule = session.get('schedule', [])
    if request.method == 'POST':
        # 振り返りデータ保存など
        return render_template('thanks.html')
    return render_template('reflection.html', schedule=schedule)

@app.route('/pomodoro')
def pomodoro():
    return render_template('pomodoro.html')

if __name__ == '__main__':
    app.run(debug=True)
