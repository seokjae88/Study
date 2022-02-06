
#include <iostream>
#include <vector>

using namespace std;

/*
* https://www.youtube.com/watch?v=cFQPwm39cOM
* 부모의 함수가 virtual functon이 되면
* 부모 클래스의 포인터를 이용해서도 자식 클래스의 함수를 호출할 수 있다
* 부모 클래스에 있는 메소드가 가상화 되면서 자식 클래스에 있는 메소드가 호출된다.
* 
* 생성자 호출 : 부모 클래스 생성자 호출후 자식 클래스 생성자가 호출된다.
* 
* 소멸자 호출 : 자식 클래스 소멸자 호출후 부모 클래스 소멸자가 호출된다.
* 부모 클래스 소멸자에 virtual 선언을 해야 자식 클래스 소멸자가 호출된다!!
* 
* pure virtual function : 자식 클래스에 반드시 있어야 된다. 컴파일 에러 발생!! 자식 클래스에 함수 생성 강제성 부여!!
* pure virtual function가 있으면 객체가 될수 없다. 컴파일 에러 발생!!
* 
*/

// https://www.youtube.com/watch?v=cFQPwm39cOM

class A {
public:
	virtual ~A() {
		cout << "Destructor A\n";
	}
	virtual void iam() {
		cout << "I am A\n";
	}
	virtual void pure() = 0; // pure virtual function
};
class AA : public A {
public:
	~AA() {
		cout << "Destructor AA\n";
	}
	void iam() {
		cout << "I am AA\n";
	}
	void pure() {
		cout << "pure AA\n";
	}
};
class AB : public A {
public:
	~AB(){
		cout << "Destructor AB\n";
	}
	void iam() {
		cout << "I am AB\n";
	}
	void pure() {
		cout << "pure AB\n";
	}
};

void doSomething(A* pa) {
	pa->iam(); // I am A
}
void doSomething(AA* pa) { // function overloading
	pa->iam(); // I am AA
}
void doSomething(AB* pa) {
	pa->iam(); // I am AB
}
void virtualFunc() {
	//A* pa = new AA();
	//pa->iam(); // I am A (virtul function 쓰기전 결과) // I am AA (virtul function 쓴후 결과)
	//pa = new AB();
	//pa->iam(); // I am A

	//doSomething(new A());
	//doSomething(new AA());
	//doSomething(new AB());

	vector<A*> va;
	va.push_back(new AA());
	va.push_back(new AB());
	va.push_back(new AB());
	va.push_back(new AA());

	for (A* a : va) {
		a->iam();
	}
}