
#include <iostream>
#include <vector>

using namespace std;

/*
* https://www.youtube.com/watch?v=cFQPwm39cOM
* �θ��� �Լ��� virtual functon�� �Ǹ�
* �θ� Ŭ������ �����͸� �̿��ؼ��� �ڽ� Ŭ������ �Լ��� ȣ���� �� �ִ�
* �θ� Ŭ������ �ִ� �޼ҵ尡 ����ȭ �Ǹ鼭 �ڽ� Ŭ������ �ִ� �޼ҵ尡 ȣ��ȴ�.
* 
* ������ ȣ�� : �θ� Ŭ���� ������ ȣ���� �ڽ� Ŭ���� �����ڰ� ȣ��ȴ�.
* 
* �Ҹ��� ȣ�� : �ڽ� Ŭ���� �Ҹ��� ȣ���� �θ� Ŭ���� �Ҹ��ڰ� ȣ��ȴ�.
* �θ� Ŭ���� �Ҹ��ڿ� virtual ������ �ؾ� �ڽ� Ŭ���� �Ҹ��ڰ� ȣ��ȴ�!!
* 
* pure virtual function : �ڽ� Ŭ������ �ݵ�� �־�� �ȴ�. ������ ���� �߻�!! �ڽ� Ŭ������ �Լ� ���� ������ �ο�!!
* pure virtual function�� ������ ��ü�� �ɼ� ����. ������ ���� �߻�!!
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
	//pa->iam(); // I am A (virtul function ������ ���) // I am AA (virtul function ���� ���)
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