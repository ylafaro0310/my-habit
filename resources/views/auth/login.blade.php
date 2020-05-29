<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 0;
            }

            .flex-center {
                width: 50%;
                margin: 0 auto;
            }
            @media screen and (max-width: 768px) {
                .flex-center {
                    width: 80%;
                }
            }

            .form > label, .form > input {
                
            }
        </style>
    </head>
    <body>
        <div class='flex-center'>
            <h2>ログイン画面</h2>
            
            <form method='POST' action='/login'>
            @csrf
            <div class='form'>
                <label for='email'>メールアドレス</label>
                <input type='email' name='email' id='email'/>
            </div>
            <div class='form'>
                <label for='password'>パスワード</label>
                <input type='password' name='password' id='password'/>
            </div>
            <div class='form'>
                <input type='checkbox' name='remember' id='remember'/>
                <label for='remember'>ログイン状態を記憶する</label>
            </div>
            <button type='submit'>ログイン</button>
            </form>
            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
        </div>
    </body>
</html>
