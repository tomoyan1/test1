let map;

/**
 * Googleマップを初期化して表示する関数。
 * この関数は、Google Maps APIのスクリプトが読み込まれた後に自動的に呼び出されます。
 */
function initMap() {
    // デフォルトの表示位置（例：東京駅）
    const tokyoStation = { lat: 35.681236, lng: 139.767125 };

    // 地図を作成し、指定したHTML要素に表示
    map = new google.maps.Map(document.getElementById("map"), {
        // 地図の中央を東京駅に設定
        center: tokyoStation,
        // ズームレベルを設定（数値が大きいほど拡大）
        zoom: 15,
    });

    // --- ここから下に、ホテルを検索してピンを立てる処理を追加していきます --- 

    // Placesサービスを作成（ホテル検索に必要）
    const service = new google.maps.places.PlacesService(map);

    // 検索リクエストを作成
    const request = {
        location: tokyoStation, // 検索の中心地
        radius: '1000',         // 半径1km以内を検索
        type: ['lodging']       // 検索タイプを「宿泊施設」に指定
    };

    // 周辺検索を実行
    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            // 検索結果が見つかった場合、各ホテルに対してピンを作成
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    });
}

/**
 * 検索結果の場所情報をもとに、地図上にマーカー（ピン）を作成する関数
 * @param {google.maps.places.PlaceResult} place 検索結果の場所情報
 */
function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;

    new google.maps.Marker({
        map: map, // このマーカーをどの地図に表示するか
        position: place.geometry.location, // マーカーの位置
        title: place.name // マーカーにマウスを乗せると表示される名前
    }); 
}
