jquery.preload
==================

preloadを実装するためのjQuery Plugin


仕様
------
 * 画像読み込み時にloadFunctionが実行され
 * 全てが読み込み終わった時にonComplateが実行される
 * 上記を使い％表示や画像の先読み後の配置などを行う

使い方
------
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery.preload.js"></script>

オプション
------

 * imgs : [], 先読みしたい画像を配列で指定（相対パス・絶対パス・ルート絶対パス）
 * loadFunction : '', %が増える度に実行される関数（オブジェクトとして下記を返す）
   * img : 読み込みが終わった画像名（timer :  trueの時、仮想の%が画像を読み込むタイミングの%の値が一緒じゃない場合undefinedを返す）
   * percent : 何％読み込み終わったか
   * num : いくつ画像が読み込み終わったか
   * aryNum : 配列の何番目の画像を読み終わったか
 * onComplete : '', 全ての画像のロードが終わった時に実行される関数（オブジェクトとして下記を返す）
   * img : 読み込みが終わった画像名
   * imgs : 読み込み終わった画像全てが入った配列
   * num : いくつ画像が読み込み終わったか
   * percent : 100を返す
   * aryNum : 配列の何番目の画像を読み終わったか

 * timer : false, trueだと1%づつスムーズに上がっていきます。
 * timerSpeed : 1%づつ増えるときのスピードの指定

### 初期設定 ###

	imgs : [],
	loadFunction : '',
	onComplete : '',
	
	timer : false,
	timerSpeed : 0

ライセンス
----------
+ Copyright 2009 &copy; kamem
+ [http://www.opensource.org/licenses/mit-license.php][mit]

[develo.org]: http://develo.org/ "develo.org"
[MIT]: http://www.opensource.org/licenses/mit-license.php