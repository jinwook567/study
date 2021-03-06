# 목표

- 최단거리 관련 정리 (O)
- 코딩테스트 4문제
- 다시 풀기 2문제
- process & thread 정리
- github 이력서 템플릿 확인 (O)

# 코딩테스트

## 파괴되지 않은 건물

이 문제는 구현만 한다면 정확성 테스트를 통과할 수 있다.
그렇다면 어떻게 해야 효율성 테스트를 통과할 수 있을까? board 루프를 돌면 통과할 수 없다.
구간합 알고리즘을 사용한다면 통과할 수 있다.

## 구간합 알고리즘

배열에서 index L, R 사이의 모든 구간의 합을 빨리 구할 수 있는 알고리즘이다.
배열보다 크기가 1개 큰 새로운 배열(P)을 정의하고, 이전 구간 + 현재 한 값을 넣어준다. P[0] = 0이다.
L,R을 구하는 방법은 P[R] - P[L-1]이다.

## 세그먼트 트리

구간을 완전 이진트리로 나누어서 저장해놓는 기법.
루트 노드에는 모든 구간을 더한, 왼쪽 노드는 0~n/2, 오른쪽 노드는 n/2+1 ~ n 까지의 구간의 합
이렇게 잎새노드까지 내려가면 범위가 1인 구간의 합으로 본인의 값이 나타나게 된다.
완전 이진트리라는 특성을 이용하여 자식 노드로 갈 떄는 왼쪽 2n+1, 오른쪽2n+2 (루트 노드의 index가 0일 때)
부모 노드로 갈 때는 나누기 2

## 카드 짝 맞추기

완전 탐색 문제이다.
전체 크기가 4x4밖에 안되기 때문에 시간 복잡도는 널널하다.
어떤 순서대로 찾아 나갈 것인가? 모든 순서에 대해서 permutation을 해서 최솟값을 구하면 된다.
그리고 시작점에서 목표 지점까지 가는 최단 경로를 구해야한다.
목표 지점까지 가는 최단 경로는 BFS를 이용하면 된다.
BFS 반복문 돌 때 처리 잘못해줘서 삽질했다..

## 광고 삽입

우리는 광고의 시작 시간을 알아야한다.그리고 가장 빠른 광고 시간을 알아내야한다.
만일 광고의 길이가 맨 마지막 재생 구간의 마지막 보다 같거나 길다면 그냥 0을 리턴하면 된다.
그게 아니라면 end - 광고 길이가 맨 처음 시작하는 부분보다 작다면 end - 광고 길이를 리턴하면 된다.
그것도 아니라면 각 start 지점을 움직이면서 얼마나 보는지 확인하고 이에대한 최대값을 가지는 초기 시작점을 배열에 넣어놓는다. 배열 내 가장 빠른 광고 시간을 리턴한다.
back 일의 자리일 때 0 붙여주기.
문제의 접근 방법은 괜찮다. 하지만, logs를 돌면서 logs에 filter를 하게 된다면 시간 복잡도는 초과한다. 300000 \* 300000로 10억을 훨씬 넘어간다.
따라서 우리는 다른 방식으로 시청 시간을 파악해야한다. 이 때 누적합을 사용하면 된다.
누적합은 매번 루프를 안돌아도 되고, 전부 더한 값을 모아놓고 한번만 루프를 돌면 되기 때문에 굉장히 효율적이다.
누적합 알고리즘을 이용해서 시간별로 시청하고 있는 인원을 구하고, 한번 더 누적합을 해서 구간별로 시청하고 있는 시청자수를 구한다.
i에서 i-adv_time 만큼 해준게 adv_time간의 구간합이다.
광고의 시작, 종료 조건에 따라 1초 차이가 날 수 있으니 이에 주의해야한다.
