import { useEffect, useState } from "react";

function App() {
  const [hasSound, setHasSound] = useState(true);
  useEffect(() => {
    if ("Notification" in window) {
      // 通知が許可されていたら早期リターン
      const permission = Notification.permission;
      if (permission === "denied" || permission === "granted") {
        return;
      }
      // 通知の許可を求める
      Notification.requestPermission().then(() => new Notification("テスト"));
    }
  }, []);

  const handlePushNotif = () => {
    if ("Notification" in window) {
      const notif = new Notification("こんにちは！");
      // プッシュ通知が表示された時に起きるイベント
      notif.addEventListener("show", () => {
        // 状態によって音の有無を変える
        if (hasSound) {
          // 音再生
          new Audio("./push.wav").play();
        }
      });
    }
  };

  return (
    <div>
      <button onClick={handlePushNotif}>PUSH</button>
      <button onClick={() => setHasSound((prev) => !prev)}>
        {hasSound ? "音なしにする" : "音ありにする"}
      </button>
    </div>
  );
}

export default App;
