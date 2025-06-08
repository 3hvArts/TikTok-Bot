
import sys
import time

def send_views(video_url):
    print(f"✅ Views sent to {video_url}")

def send_likes(video_url):
    print(f"✅ Likes sent to {video_url}")

def send_followers(video_url):
    print(f"✅ Followers sent to {video_url}")

def send_shares(video_url):
    print(f"✅ Shares sent to {video_url}")

def send_favorites(video_url):
    print(f"✅ Favorites sent to {video_url}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("❌ Usage: python3 main.py <video_url> <service>")
        sys.exit(1)

    url = sys.argv[1]
    service = sys.argv[2]

    if service == "views":
        send_views(url)
    elif service == "likes":
        send_likes(url)
    elif service == "followers":
        send_followers(url)
    elif service == "shares":
        send_shares(url)
    elif service == "favorites":
        send_favorites(url)
    else:
        print("❌ Invalid service")
