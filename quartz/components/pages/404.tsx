import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg, ctx }: QuartzComponentProps) => {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = ctx.argv.serve ? "/" : url.pathname

  return (
    <article class="popover-hint">
      <h1>404</h1>
      <p>Эту загадку ещё предстоит раскрыть.</p>
      <div class="not-found-actions">
        <a href={baseDir}>Вернуться на главную</a>
        <a id="return-to-previous" href="#" style="display: none"></a>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          if (typeof fetchData !== "undefined") {
            fetchData.then(function(index) {
              var basePath = document.body.dataset.basepath || "";
              if (basePath.length > 1 && basePath.endsWith("/")) {
                basePath = basePath.slice(0, -1);
              }
              var pathname = window.location.pathname;
              var hasBasePrefix = basePath.length > 1 && pathname.startsWith(basePath);
              if (hasBasePrefix) {
                pathname = pathname.slice(basePath.length);
              }
              if (pathname.startsWith("/")) {
                pathname = pathname.slice(1);
              }
              if (pathname.endsWith("/")) {
                pathname = pathname.slice(0, -1);
              }
              if (pathname.endsWith(".html")) {
                pathname = pathname.slice(0, -5);
              }
              if (pathname.endsWith("/index")) {
                pathname = pathname.slice(0, -6);
              }
              try {
                pathname = decodeURIComponent(pathname);
              } catch (_) {}
              var lowered = pathname.toLowerCase();
              if (lowered !== pathname && index[lowered] != null) {
                var prefix = hasBasePrefix ? basePath : "";
                var target = prefix + (prefix.endsWith("/") ? "" : "/") + lowered;
                window.location.replace(target);
                return;
              }

              var previousLink = document.getElementById("return-to-previous");
              var previousPage = null;
              try {
                previousPage = JSON.parse(sessionStorage.getItem("quartz-previous-page"));
              } catch (_) {}

              if (!previousPage && document.referrer) {
                try {
                  var referrer = new URL(document.referrer);
                  if (referrer.origin === window.location.origin) {
                    var referrerPath = referrer.pathname;
                    if (basePath.length > 1 && referrerPath.startsWith(basePath)) {
                      referrerPath = referrerPath.slice(basePath.length);
                    }
                    referrerPath = referrerPath.replace(/^\\/+|\\/+$/g, "") || "index";
                    var referrerEntry = index[decodeURIComponent(referrerPath).toLowerCase()];
                    previousPage = {
                      url: referrer.href,
                      title: referrerEntry && referrerEntry.title
                    };
                  }
                } catch (_) {}
              }

              if (previousLink && previousPage && previousPage.url && previousPage.title) {
                previousLink.href = previousPage.url;
                previousLink.textContent = "Вернуться назад: " + previousPage.title;
                previousLink.style.display = "inline";
                previousLink.addEventListener("click", function(event) {
                  if (window.history.length > 1) {
                    event.preventDefault();
                    window.history.back();
                  }
                });
              }

              var rightSidebar = document.querySelector(".sidebar.right");
              if (rightSidebar) {
                var oldPanel = rightSidebar.querySelector(".not-found-backlinks");
                if (oldPanel) oldPanel.remove();

                var sources = Object.values(index).filter(function(entry) {
                  return Array.isArray(entry.links) && entry.links.includes(lowered);
                });

                if (sources.length > 0) {
                  var panel = document.createElement("div");
                  panel.className = "backlinks not-found-backlinks";
                  var heading = document.createElement("h3");
                  heading.textContent = "Обратные ссылки";
                  panel.appendChild(heading);

                  var list = document.createElement("ul");
                  list.className = "overflow";
                  sources.forEach(function(entry) {
                    var item = document.createElement("li");
                    var link = document.createElement("a");
                    link.className = "internal";
                    link.textContent = entry.title;
                    link.href = entry.slug === "index"
                      ? (basePath || "/")
                      : basePath + "/" + entry.slug;
                    item.appendChild(link);
                    list.appendChild(item);
                  });

                  panel.appendChild(list);
                  rightSidebar.appendChild(panel);
                }
              }
            });
          }
          `,
        }}
      />
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
