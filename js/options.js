// Saves options to chrome.storage
function save_options() {
  window.alert('ok?');
  var alpha = document.getElementById('alpha').value;
  var forceMuteOff = document.getElementById('force_mute_off').checked;
  chrome.storage.local.set({
    alpha: alpha,
    forceMuteOff: forceMuteOff
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.local.get({
    alpha: 0.3,
    forceMuteOff: false
  }, function(items) {
    document.getElementById('alpha').value = items.alpha;
    document.getElementById('force_mute_off').checked = items.forceMuteOff;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);