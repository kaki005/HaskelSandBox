package main
import (
	"fmt"
	"time"
)
func total(c chan int) {
	n := <-c	// チャンネルから値を受け取る
	fmt.Println("n = ", n) 
	t  := 0
	for i := 1; i<=n; i++ {
		t += i
	}
	fmt.Println("total = ", t)
}

func main(){
	c := make(chan int)
	//c <- 100
	go total(c)	// 別スレッドで呼び出し
	c <- 100	// チャンネルで値を渡す
	time.Sleep(200 * time.Millisecond)	// 別スレッドが終わるまで待機
}

