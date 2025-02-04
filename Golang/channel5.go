package main
import (
	"fmt"
	"time"
)

func count(num int, duration int, c chan int){
	for i := 1; i<= num; i++ {
		c <- i
		time.Sleep(time.Duration(duration) * time.Millisecond)
	}
}

func main(){
	c1 := make(chan int)
	c2 := make(chan int)
	c3 := make(chan int)
	n1, n2, n3 := 3, 5, 10
	go count(n1, 100, c1)
	go count(n2, 75, c2)
	go count(n3, 50, c3)
	for i := 0; i < n1+n2+n3; i++{
		select {
		case re:= <-c1:			// チャンネル1のとき
			fmt.Println("first thread  : ", re)
		case re := <-c2:		// チャンネル2のとき
			fmt.Println("second thread : ", re)
		case re:= <-c3:			// チャンネル3のとき
			fmt.Println("third thread  : ", re)
		}
	}
	fmt.Println(" ***** finish *****")
}

