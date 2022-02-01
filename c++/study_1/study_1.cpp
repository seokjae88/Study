// study_1.cpp : 이 파일에는 'main' 함수가 포함됩니다. 거기서 프로그램 실행이 시작되고 종료됩니다.
//

/*
* deep copy : copy constructor 를 따로 생성.
* shallow copy : pointer 까지 복사해서 공유. 소멸시 메모리 해제 이슈.
*/


#include <iostream>

using namespace std;

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

int main()
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

// 프로그램 실행: <Ctrl+F5> 또는 [디버그] > [디버깅하지 않고 시작] 메뉴
// 프로그램 디버그: <F5> 키 또는 [디버그] > [디버깅 시작] 메뉴

// 시작을 위한 팁: 
//   1. [솔루션 탐색기] 창을 사용하여 파일을 추가/관리합니다.
//   2. [팀 탐색기] 창을 사용하여 소스 제어에 연결합니다.
//   3. [출력] 창을 사용하여 빌드 출력 및 기타 메시지를 확인합니다.
//   4. [오류 목록] 창을 사용하여 오류를 봅니다.
//   5. [프로젝트] > [새 항목 추가]로 이동하여 새 코드 파일을 만들거나, [프로젝트] > [기존 항목 추가]로 이동하여 기존 코드 파일을 프로젝트에 추가합니다.
//   6. 나중에 이 프로젝트를 다시 열려면 [파일] > [열기] > [프로젝트]로 이동하고 .sln 파일을 선택합니다.
