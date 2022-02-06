
#include <iostream>

using namespace std;

/*
* deep copy : copy constructor 를 따로 생성.
* shallow copy : pointer 까지 복사해서 공유. 소멸시 메모리 해제 이슈.
*/

class Car {
private:
    int year;
    char* ptr;
public:
    Car(int _year) : year(_year) {
        cout << "original constructor was called" << endl;
        ptr = new char[300000];
    }
    ~Car() {
        delete[] ptr;
    }
    Car(Car& _c) {
        cout << "copy constructor was called" << endl;
        year = _c.year;
        ptr = new char[300000]; // copy constructor 가 필요한 이유
    }
    void showYear() {
        cout << "This car was made in " << year << endl;
    }
};

void copyConstruct()
{
    //Car c(2010);
    //c.showYear();

    //Car d = c;
    //Car e(c);

    //d.showYear();
    //e.showYear();

    //Car f(2030);
    //f.showYear();

    //f = c;


    //Car* pc = new Car(2011);
    //pc->showYear();

    //Car* pd = new Car(*pc);
    //pd->showYear();

    Car c(2010);
    {
        Car d = c;
    }


}