import socketio
import uvicorn
import multiprocessing as mp

correct_answers = [
    {
        "id": "1",
        "long": "39.952583",
        "lat": "-75.165222",
    }
]

connected_users = []

# only for testing, remove in production
sio = socketio.Server(cors_allowed_origins='*')


@sio.on('connect')
def connect(sid, environ):
    print("connect ", sid)


@sio.on('disconnect')
def disconnect(sid):
    print('disconnect ', sid)


if __name__ == '__main__':
    app = socketio.WSGIApp(sio)
    uvicorn.run(app, host='localhost', port=8000)
    print("test")
