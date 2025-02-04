package main
import (
	"fmt"
)

// 1からnまでの和を計算する
func total(n int, c chan int) {
	t  := 0
	for i := 1; i<=n; i++ {
		t += i
	}
	c <- t	// 結果をチャンネルでメインスレッドへ通知
}

func main(){
	c := make(chan int) // チャンネル作成
	go total(100, c)	// 別スレッドで呼び出し
	result := <-c 		// 結果をチャンネルから受け取る
	fmt.Println("total:", result)
}

