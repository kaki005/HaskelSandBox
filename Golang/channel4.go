package main
import (
	"fmt"
	"time"
	"strconv"
)

func printMsg(duration int, s string){
	fmt.Println(s)
	time.Sleep(time.Duration(duration) * time.Millisecond)
}
func first(n int, c chan string) {
	const nm string = "first-"
	for i:= 0; i < n; i++ {
		s := nm + strconv.Itoa(i)
		printMsg(n, s)
		c <- s
	}
}

func second(n int, c chan string){
	for i:= 0; i< n; i++ {
		printMsg(n, "second:["+ <-c + "]")
	}
}


func main(){
	c := make(chan string)
	go first(10, c)
	second(10, c)
	fmt.Println()
}

