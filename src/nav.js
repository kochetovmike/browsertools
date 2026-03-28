(function () {
  const ROOT = (document.querySelector('meta[name="base-href"]') || {}).content || './';
  const PAGE = document.body.dataset.page || '';

  const NAV_GROUPS = [
    {
      label: 'PDF Tools',
      items: [
        { id: 'pdf-merge',          path: 'pdf/merge/',          label: 'Merge PDFs' },
        { id: 'pdf-split',          path: 'pdf/split/',          label: 'Split PDF' },
      ]
    },
    {
      label: 'Text Tools',
      items: [
        { id: 'text-json-yaml-toml', path: 'text/json-yaml-toml/', label: 'JSON / YAML / TOML' },
        { id: 'text-markdown',       path: 'text/markdown/',        label: 'Markdown \u2194 HTML' },
        { id: 'text-base64',         path: 'text/base64/',          label: 'Base64' },
        { id: 'text-url-encode',     path: 'text/url-encode/',      label: 'URL Encode / Decode' },
        { id: 'text-timestamp',      path: 'text/timestamp/',       label: 'Unix Timestamp' },
        { id: 'text-csv',            path: 'text/csv/',             label: 'CSV / JSON / Table' },
        { id: 'text-escape',         path: 'text/escape/',          label: 'Escape / Unescape' },
        { id: 'text-keygen',         path: 'text/keygen/',          label: 'Random Key' },
        { id: 'text-lorem-ipsum',    path: 'text/lorem-ipsum/',     label: 'Lorem Ipsum' },
      ]
    },
    {
      label: 'QR Code',
      items: [
        { id: 'qr-generator', path: 'qr/', label: 'QR Generator' },
      ]
    },
  ];

  // Build sidebar HTML
  var html = '<div class="sidebar-header">'
    + '<a class="logo" href="' + ROOT + '">OneTab<span>Tools</span></a>'
    + '<button class="sidebar-close" id="sidebar-close" aria-label="Close navigation">\u2715</button>'
    + '</div>'
    + '<nav class="sidebar-nav">';

  for (var gi = 0; gi < NAV_GROUPS.length; gi++) {
    var group = NAV_GROUPS[gi];
    html += '<div class="nav-group"><div class="nav-group-label">' + group.label + '</div>';
    for (var ii = 0; ii < group.items.length; ii++) {
      var item = group.items[ii];
      var cls  = 'nav-item' + (PAGE === item.id ? ' active' : '');
      html += '<a class="' + cls + '" href="' + ROOT + item.path + '">' + item.label + '</a>';
    }
    html += '</div>';
  }
  html += '</nav>';

  var sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.innerHTML = html;

  // ── Toggle logic ──────────────────────────────────────────
  var overlay  = document.getElementById('sidebar-overlay');
  var hamburger = document.getElementById('hamburger');

  function openSidebar() {
    if (sidebar)  sidebar.classList.add('open');
    if (overlay)  overlay.classList.add('on');
  }
  function closeSidebar() {
    if (sidebar)  sidebar.classList.remove('open');
    if (overlay)  overlay.classList.remove('on');
  }

  if (hamburger) hamburger.addEventListener('click', openSidebar);
  if (overlay)   overlay.addEventListener('click', closeSidebar);

  // sidebar-close button is injected above, so attach via delegation
  document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'sidebar-close') closeSidebar();
  });
}());
