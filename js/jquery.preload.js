/**
 *	jQuery preload.
 *	jQuery required.
 *	
 *	* Copyright 2013 (c) kamem
 *	* http://develo.org/
 *	* Licensed Under the MIT.
 *	
 *	Date: 2013.12.30
 *	
 *	* loadFunction : %が増える度に実行される関数（オブジェクトとして下記を返す）
 *		* img : 読み込みが終わった画像名（timer :  trueの時、仮想の%が画像を読み込むタイミングの%の値が一緒じゃない場合undefinedを返す）
 *		* percent : 何％読み込み終わったか
 *		* num : いくつ画像が読み込み終わったか
 *		* aryNum : 配列の何番目の画像を読み終わったか
 *	* onComplete : 全ての画像のロードが終わった時に実行される関数（オブジェクトとして下記を返す）
 *		* img : 読み込みが終わった画像名
 *		* imgs : 読み込み終わった画像全てが入った配列
 *		* num : いくつ画像が読み込み終わったか
 *		* percent : 100を返す
 *		* aryNum : 配列の何番目の画像を読み終わったか

 *	* timer : trueだと1%づつスムーズに上がっていきます。
 *	* timerSpeed : 1%づつ増えるときのスピードの指定
 *	
 *	@class preload
 */

(function($,global){

$.fn.preload = function(options) {

	var c = $.extend({
			imgs : [],
			loadFunction : '',
			onComplete : '',
			
			timer : false,
			timerSpeed : 0
		},options),
		
		imgs = c.imgs,
		onComplete = c.onComplete,
		loadFunction = c.loadFunction,
		
		timer = c.timer,
		speed = c.timerSpeed,
		
		nowPercent = 0,
		percent = 0,
		loadedAry = {
			percent : [], //画像の枚数に合わせて何％で画像が読み込まれるかの配列（timer:true時に遅らせて読み込ませるときにそのpercentに来た時に画像を返す）
			img : []  //そのpercentに来た時に同じ位置の配列にあるimgを返すために使う
		},
		loadedAryNum = 0; //今いくつ終わっているか（0から）

	var imgsAry = [];
	for (var i = 0; i < c.imgs.length; i++) {
		imgs[i] = c.imgs[i];
		imgsAry[i] = c.imgs[i];
	}
	
	var total = imgs.length;

	/**
	 *	プリロードメイン処理
	 * （配列に入っている画像を仮想imgとして配置）
	 *	
	 *	@method preload
	 *	@param {Array} 画像の配列
	 *	@param {Function} function(画像のトータル枚数,読み込み終わった枚数){}
	 */
	function preload(images, progress) {
		for (var i = 0; i < images.length; i++) {
		
	        $('<img>').attr('src', images[i]).load(function(e) {
	        
	        	images.splice(0,1);
	        	
				progress(total,  total - images.length,e);
			});
		}
	}

	preload(imgs, function(total, loaded,e){
		nowPercent = Math.ceil(100 * loaded / total);	//枚数に対して何％終わっているか
		
		loadedAry.percent.push(nowPercent); //それを配列に追加する
		loadedAry.img.push($(e.currentTarget)[0].src); //そのときにはどの画像の読み込みが終わったのかを同じ位置の配列に入れる
		
		if(!timer) {
			percent = nowPercent;
		}

		//画像が全て読み込み終わったらonComplate関数を実行
		if (loaded >= total) {
			if(!(onComplete == '') && !timer) {
				onComplete({
					img : $(e.currentTarget)[0].src,
					imgs : imgsAry,
					percent : percent,
					num : loaded,
					aryNum : $.inArray($(e.currentTarget)[0].src, imgsAry) 
				});
			}
		}

		//それ以外の場合は画像が読み込み終わるたびにloadFunction関数を実行
		else {
			if(!(loadFunction == '') && !timer) {
				loadFunction({
					img : $(e.currentTarget)[0].src,
					percent : percent,
					num : loaded,
					aryNum : $.inArray($(e.currentTarget)[0].src, imgsAry) 
				});
			}
		}
	});

	//timer=ture（ダウンロード済み数値をスムーズにしたい場合に)実行	
	if(timer) {
		
		var timer = setInterval(function() {
		
			//画像が全て読み込み終わったらonComplate関数を実行
			if (percent >= 100) {
				clearInterval(timer);

				onComplete({
					img : loadedAry.img[loadedAryNum],
					imgs : imgsAry,
					percent : percent,
					num : loadedAryNum + 1,
					aryNum : $.inArray(loadedAry.img[loadedAryNum], imgsAry) 
				});
			}
			
			// 何％終わっているかを見てそれ以下だった場合はloadFunction関数に実行
			else if(percent < nowPercent) {
				// 仮想の%が画像を読み込むタイミングの%の値が一緒じゃない場合
				if (percent !== loadedAry.percent[loadedAryNum]) {
					percent++;
					loadFunction({
						percent : percent,
						num : loadedAryNum
					});
				}
				// 仮想の%が画像を読み込むタイミングの%の値が一緒の場合
				else {
					percent++;
					loadFunction({
						img : loadedAry.img[loadedAryNum],
						percent : percent,
						num : loadedAryNum + 1,
						aryNum : $.inArray(loadedAry.img[loadedAryNum], imgsAry) 
					});
					loadedAryNum++;
				}
			}
		},speed);
	}
}
}(jQuery,this));