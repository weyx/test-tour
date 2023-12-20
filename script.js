(function(){
    var script = {
 "start": "this.playAudioList([this.audio_687397BD_7A3B_ED6E_41B9_E4C7CBA4ECA0]); this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist,this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); this.playList_96FC06C8_867D_59E9_41CD_82CDB390E8C2.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "children": [
  "this.MainViewer",
  "this.Container_0AEF1C12_16A3_8FB1_4188_D5C88CE581C3",
  "this.Container_49D03164_57CA_79EE_41B1_5425A56CE8B0",
  "this.MapViewer",
  "this.Container_42B697D2_5CC7_4312_41C3_D35F999D31FE",
  "this.Container_4E6C6158_5A36_BA67_41D5_8CC28887B5D9",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_32CC4EA6_16EF_8891_41B3_C36F5FCE49B7",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95",
  "this.Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08"
 ],
 "defaultVRPointer": "laser",
 "paddingLeft": 0,
 "id": "rootPlayer",
 "gap": 10,
 "scrollBarMargin": 2,
 "class": "Player",
 "scripts": {
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "existsKey": function(key){  return key in window; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "unregisterKey": function(key){  delete window[key]; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getKey": function(key){  return window[key]; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "registerKey": function(key, value){  window[key] = value; }
 },
 "width": "100%",
 "height": "100%",
 "shadow": false,
 "overflow": "visible",
 "backgroundPreloadEnabled": true,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "definitions": [{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8B8C8B7B_867D_68A8_41E0_B04CE4FC1BBA",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 19.96,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 2-4 (1)",
 "id": "panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_393C7500_2CA9_18BB_41C0_AC530D03CB9D",
  "this.overlay_3B9236B9_2CA8_F9CD_41C5_7CC751A29806",
  "this.panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1528A598_0E47_2682_419F_D4D43FD887F8",
   "yaw": 2.03,
   "backwardYaw": 149.12,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065",
   "yaw": -122.36,
   "backwardYaw": 6.12,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_0E4C7505_0571_2B10_418D_58B200FF616A_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -77.76,
  "pitch": -0.87
 }
},
{
 "vfov": 180,
 "label": "Titik 2-4 (4)",
 "id": "panorama_1528DFC3_0E47_6287_4168_2A5FED85E797",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_3E27D092_2CA9_19DF_41C0_0086BE9ED6D1",
  "this.overlay_3F860738_2CA9_18CA_41A2_EC783FF21995",
  "this.panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE",
   "yaw": 165.92,
   "backwardYaw": -133.71,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15CD94F3_0E47_6687_4178_848F8F9858B3",
   "yaw": -20.21,
   "backwardYaw": -155.95,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88D90881_867D_685B_41BE_0377312C40AD",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 149.8,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BBA1B40_867D_68D8_41C3_9CF56AFEAF21",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 6.34,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88B7A8A0_867D_6859_41D5_C36D81C3D00D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 104.86,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 5 jalan raya",
 "id": "panorama_1135AE32_0E7E_E581_4165_7567158085FA",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_103D59E6_0E49_2E81_41A7_42A08C5C6941",
  "this.overlay_16AB03E9_0E47_6282_41A4_132B755E166B",
  "this.overlay_16D8FA55_0E59_2D83_4167_2B0C45306F08",
  "this.panorama_1135AE32_0E7E_E581_4165_7567158085FA_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59",
   "yaw": -160.04,
   "backwardYaw": -3.42,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0",
   "yaw": 20.19,
   "backwardYaw": 156.38,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B",
   "yaw": -76.05,
   "backwardYaw": -115.55,
   "distance": 1
  }
 ],
 "hfov": 360,
 "mapLocations": [
  {
   "map": "this.map_7FDF4563_5A69_5A28_41CB_6937066B3391",
   "class": "PanoramaMapLocation",
   "angle": 71.24,
   "y": 738.94,
   "x": 1307.82
  }
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PlayList",
 "items": [
  {
   "media": "this.panorama_0E6A508E_0571_E910_4182_3FA194973CF0",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 0, 1)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E6A508E_0571_E910_4182_3FA194973CF0_camera"
  },
  {
   "media": "this.panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 1, 2)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_camera"
  },
  {
   "media": "this.panorama_0E4E731A_0571_6F31_4162_D4BA007223D8",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 2, 3)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_camera"
  },
  {
   "media": "this.panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 3, 4)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_camera"
  },
  {
   "media": "this.panorama_0E6ECE99_0571_F930_4187_CDDECD89D395",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 4, 5)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_camera"
  },
  {
   "media": "this.panorama_0E4C7505_0571_2B10_418D_58B200FF616A",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 5, 6)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E4C7505_0571_2B10_418D_58B200FF616A_camera"
  },
  {
   "media": "this.panorama_0E42CECD_0571_1913_4164_CCF35AE78A87",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 6, 7)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_camera"
  },
  {
   "media": "this.panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 7, 8)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_camera"
  },
  {
   "media": "this.panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 8, 9)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_camera"
  },
  {
   "media": "this.panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 9, 10)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_camera"
  },
  {
   "media": "this.panorama_09916AFC_05BF_E281_4186_720CA74703AB",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 10, 11)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09916AFC_05BF_E281_4186_720CA74703AB_camera"
  },
  {
   "media": "this.panorama_09917766_05BF_2381_4162_44384798B870",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 11, 12)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09917766_05BF_2381_4162_44384798B870_camera"
  },
  {
   "media": "this.panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 12, 13)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_camera"
  },
  {
   "media": "this.panorama_08B36D2B_05B9_2786_417C_E427144A44E5",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 13, 14)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_08B36D2B_05B9_2786_417C_E427144A44E5_camera"
  },
  {
   "media": "this.panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 14, 15)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_camera"
  },
  {
   "media": "this.panorama_18A51027_0EF9_3D8F_4187_38630AC4D588",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 15, 16)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_camera"
  },
  {
   "media": "this.panorama_19C52053_0EFF_5D87_4196_595FEE001077",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 16, 17)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_19C52053_0EFF_5D87_4196_595FEE001077_camera"
  },
  {
   "media": "this.panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 17, 18)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_camera"
  },
  {
   "media": "this.panorama_19C50517_0EFF_278F_418F_A1A6D818ED77",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 18, 19)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_camera"
  },
  {
   "media": "this.panorama_19C5D87C_0EFF_6D81_4192_778A4793128C",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 19, 20)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_camera"
  },
  {
   "media": "this.panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 20, 21)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_camera"
  },
  {
   "media": "this.panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 21, 22)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_camera"
  },
  {
   "media": "this.panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 22, 23)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_camera"
  },
  {
   "media": "this.panorama_1135AE32_0E7E_E581_4165_7567158085FA",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 23, 24)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1135AE32_0E7E_E581_4165_7567158085FA_camera"
  },
  {
   "media": "this.panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 24, 25)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_camera"
  },
  {
   "media": "this.panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 25, 26)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_camera"
  },
  {
   "media": "this.panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 26, 27)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_camera"
  },
  {
   "media": "this.panorama_1539EF00_0E49_6381_41A6_6AD6645EA450",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 27, 28)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_camera"
  },
  {
   "media": "this.panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 28, 29)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_camera"
  },
  {
   "media": "this.panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 29, 30)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_camera"
  },
  {
   "media": "this.panorama_1528DFC3_0E47_6287_4168_2A5FED85E797",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 30, 31)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_camera"
  },
  {
   "media": "this.panorama_15CD94F3_0E47_6687_4178_848F8F9858B3",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 31, 32)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_camera"
  },
  {
   "media": "this.panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 32, 33)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_camera"
  },
  {
   "media": "this.panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 33, 34)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_camera"
  },
  {
   "media": "this.panorama_1528A598_0E47_2682_419F_D4D43FD887F8",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 34, 35)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1528A598_0E47_2682_419F_D4D43FD887F8_camera"
  },
  {
   "media": "this.panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 35, 36)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_camera"
  },
  {
   "media": "this.panorama_15C262D9_0E49_6283_4181_A0951E3715F8",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 36, 37)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15C262D9_0E49_6283_4181_A0951E3715F8_camera"
  },
  {
   "media": "this.panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 37, 38)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_camera"
  },
  {
   "media": "this.panorama_15C25C28_0E49_6581_418D_F485BF9783EC",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 38, 39)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15C25C28_0E49_6581_418D_F485BF9783EC_camera"
  },
  {
   "media": "this.panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 39, 40)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_camera"
  },
  {
   "media": "this.panorama_15CDCACE_0E46_E281_419B_D1DF72349238",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 40, 41)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15CDCACE_0E46_E281_419B_D1DF72349238_camera"
  },
  {
   "media": "this.panorama_152BA07A_0E46_FD81_41A1_67DE57E97658",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 41, 42)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_camera"
  },
  {
   "media": "this.panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 42, 43)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_camera"
  },
  {
   "media": "this.panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 43, 44)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_camera"
  },
  {
   "media": "this.panorama_15C2515F_0E49_3FBF_4197_AB506B14A635",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist, 44, 0)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_camera"
  }
 ],
 "id": "ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88405BBD_867D_6FA8_41E0_8E2232E75B18",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 112.57,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 2 (3)",
 "id": "panorama_15C262D9_0E49_6283_4181_A0951E3715F8",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_35993620_2CDB_18FB_4193_6D05BB128941",
  "this.overlay_36758ED7_2CDB_0945_41AC_8C368AA7A89B",
  "this.overlay_32AA0C09_2CD9_08CD_41C4_D7463562862A",
  "this.panorama_15C262D9_0E49_6283_4181_A0951E3715F8_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460",
   "yaw": -14.31,
   "backwardYaw": 148.66,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56",
   "yaw": 161.38,
   "backwardYaw": 106.9,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15CDCACE_0E46_E281_419B_D1DF72349238",
   "yaw": 175.38,
   "backwardYaw": -114.19,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88143BE7_867D_6FD8_41D7_577645715017",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 165.69,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8866F811_867D_687B_41CD_9FB48C49FA52",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -27.45,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 2 (5)",
 "id": "panorama_1528A598_0E47_2682_419F_D4D43FD887F8",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_3A4DF805_2CD7_08C5_4151_97FC90AF8AFD",
  "this.overlay_3B58CAD9_2CD9_094A_41C4_29FBCC88963B",
  "this.panorama_1528A598_0E47_2682_419F_D4D43FD887F8_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773",
   "yaw": 149.12,
   "backwardYaw": 2.03,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460",
   "yaw": -20.67,
   "backwardYaw": 47.43,
   "distance": 1
  }
 ],
 "hfov": 360,
 "mapLocations": [
  {
   "map": "this.map_7FDF4563_5A69_5A28_41CB_6937066B3391",
   "class": "PanoramaMapLocation",
   "angle": 12.29,
   "y": 500.19,
   "x": 1730.49
  }
 ],
 "partial": false
},
{
 "vfov": 180,
 "label": "titik 9-8",
 "id": "panorama_0E42CECD_0571_1913_4164_CCF35AE78A87",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_11C08CE0_0591_3910_4190_C1EC2BDFF437",
  "this.overlay_11E5E997_0591_1B3F_4185_93DE1F284145",
  "this.panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E4C7505_0571_2B10_418D_58B200FF616A",
   "yaw": 7.03,
   "backwardYaw": -75.14,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093",
   "yaw": -173.66,
   "backwardYaw": 174.54,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88CC0C22_867D_6859_41D0_C716CB596C66",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -159.81,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BD2B7A4_867D_5858_41E0_47625952AA7C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 178.85,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_89712C6F_867D_68A7_41B2_EF2FC0D7CB9F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 10.88,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BCC67B2_867D_67B9_41CA_AE21C1E23A4F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -167.98,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 4 jalan raya",
 "id": "panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_16685F2E_0E49_239E_41A5_98EA125C842A",
  "this.overlay_1471DD8A_0E49_E681_4185_E855F12B4FB0",
  "this.overlay_1426A35E_0E4A_E381_418D_83F6A0421AF8",
  "this.overlay_3F89F87E_2CAB_0947_41C3_6ACD1824AA56",
  "this.overlay_54FDDC55_4D3A_10EC_41D2_C28E88FA8326",
  "this.panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0",
   "yaw": 49.24,
   "backwardYaw": -30.2,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1528DFC3_0E47_6287_4168_2A5FED85E797",
   "yaw": -133.71,
   "backwardYaw": 165.92,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1539EF00_0E49_6381_41A6_6AD6645EA450",
   "yaw": 153.66,
   "backwardYaw": 80.57,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D"
  }
 ],
 "hfov": 360,
 "mapLocations": [
  {
   "map": "this.map_7FDF4563_5A69_5A28_41CB_6937066B3391",
   "class": "PanoramaMapLocation",
   "angle": -132.51,
   "y": 738.94,
   "x": 1441.91
  }
 ],
 "partial": false
},
{
 "buttonCardboardView": [
  "this.IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA",
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB"
 ],
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "displayPlaybackBar": true,
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "class": "PanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "mouseControlMode": "drag_acceleration",
 "gyroscopeVerticalDraggingEnabled": true
},
{
 "vfov": 180,
 "label": "Titik 6 view pantai(1)",
 "id": "panorama_19C50517_0EFF_278F_418F_A1A6D818ED77",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_130BC8BA_0E5E_EE81_4185_00F535272EA5",
  "this.panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D",
   "yaw": -151.41,
   "backwardYaw": -139.61,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88323837_867D_68A7_41D7_D392821B1B50",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 83.07,
  "pitch": 0
 }
},
{
 "class": "FadeOutEffect",
 "easing": "quad_in",
 "id": "effect_7D91332D_57CA_B97E_41CC_A143DC50AC53",
 "duration": 500
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "id": "window_53D6680D_4EEE_707C_41C5_32227A86EE70",
 "width": 400,
 "class": "Window",
 "bodyBackgroundOpacity": 1,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "shadowSpread": 1,
 "closeButtonRollOverBorderColor": "#000000",
 "footerBackgroundColorDirection": "vertical",
 "headerBackgroundColorRatios": [
  0,
  0
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "titleFontFamily": "Poppins ExtraBold",
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "footerBorderColor": "#FDEC8B",
 "bodyPaddingRight": 5,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "titleFontSize": "3vh",
 "titleFontColor": "#FFFFFF",
 "titlePaddingTop": 5,
 "closeButtonPressedBackgroundOpacity": 0,
 "closeButtonRollOverBorderSize": 0,
 "modal": true,
 "headerBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "shadowHorizontalLength": 3,
 "footerBackgroundOpacity": 1,
 "footerBorderSize": 0,
 "veilOpacity": 0.4,
 "height": 300,
 "minHeight": 20,
 "title": "Titik 10: Pantai Touke",
 "footerHeight": 5,
 "closeButtonPaddingLeft": 10,
 "backgroundColor": [],
 "propagateClick": false,
 "titlePaddingRight": 5,
 "veilColorDirection": "horizontal",
 "headerBorderSize": 0,
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "minWidth": 20,
 "headerPaddingRight": 10,
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "verticalAlign": "middle",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "closeButtonBackgroundColorRatios": [
  0.73
 ],
 "bodyBackgroundColor": [
  "#FFFFFF"
 ],
 "titleFontWeight": "bold",
 "closeButtonPaddingBottom": 0,
 "titleFontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "closeButtonPaddingRight": 10,
 "titlePaddingBottom": 5,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "veilShowEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonIconColor": "#FFFFFF",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonBackgroundOpacity": 0,
 "closeButtonBorderRadius": 0,
 "headerBackgroundOpacity": 1,
 "children": [
  "this.htmlText_53D0480D_4EEE_707C_41CF_F648A7CE9FFB"
 ],
 "headerPaddingLeft": 10,
 "closeButtonBorderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "veilColorRatios": [
  0,
  1
 ],
 "shadowColor": "#000000",
 "closeButtonPressedIconColor": "#FFFFFF",
 "bodyBorderColor": "#FFFFFF",
 "titleTextDecoration": "none",
 "closeButtonPressedBorderColor": "#000000",
 "closeButtonPressedIconLineWidth": 3,
 "layout": "vertical",
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonRollOverBackgroundOpacity": 0,
 "bodyPaddingBottom": 5,
 "bodyBackgroundColorRatios": [
  0
 ],
 "hideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "shadowOpacity": 0.5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#FF9900"
 ],
 "closeButtonPaddingTop": 0,
 "borderRadius": 5,
 "closeButtonIconHeight": 24,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBorderSize": 0,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "borderSize": 0,
 "backgroundColorRatios": [],
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColor": [
  "#FFFFFF"
 ],
 "bodyPaddingLeft": 5,
 "closeButtonRollOverIconLineWidth": 3,
 "closeButtonIconWidth": 24,
 "closeButtonIconLineWidth": 3,
 "shadowVerticalLength": 0,
 "headerBorderColor": "#000000",
 "bodyBorderSize": 0,
 "footerBackgroundColorRatios": [
  0
 ],
 "bodyBackgroundColorDirection": "vertical",
 "headerPaddingBottom": 10,
 "footerBackgroundColor": [
  "#FF9900"
 ],
 "data": {
  "name": "Window24624"
 },
 "gap": 10,
 "closeButtonBorderColor": "#000000",
 "paddingBottom": 0,
 "headerVerticalAlign": "middle",
 "paddingTop": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_89CFD9DB_867D_6BE8_41E0_AA91B8CC961F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -31.34,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88840C64_867D_68D9_4194_913C7FB7E436",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -113.05,
  "pitch": 0
 }
},
{
 "id": "window_514F27ED_4D1A_7FBC_41D2_9560EC28E7F3",
 "width": 400,
 "class": "Window",
 "bodyBackgroundOpacity": 1,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "shadowSpread": 1,
 "closeButtonRollOverBorderColor": "#000000",
 "footerBackgroundColorDirection": "vertical",
 "headerBackgroundColorRatios": [
  0,
  0
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "titleFontFamily": "Poppins ExtraBold",
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "footerBorderColor": "#FDEC8B",
 "bodyPaddingRight": 5,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "titleFontSize": "3vh",
 "titleFontColor": "#FFFFFF",
 "titlePaddingTop": 5,
 "closeButtonPressedBackgroundOpacity": 0,
 "closeButtonRollOverBorderSize": 0,
 "modal": true,
 "headerBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "shadowHorizontalLength": 3,
 "footerBackgroundOpacity": 1,
 "footerBorderSize": 0,
 "veilOpacity": 0.4,
 "height": 300,
 "minHeight": 20,
 "title": "Titik 5: Pantai Mata Ikan Indah",
 "footerHeight": 5,
 "closeButtonPaddingLeft": 10,
 "backgroundColor": [],
 "propagateClick": false,
 "titlePaddingRight": 5,
 "veilColorDirection": "horizontal",
 "headerBorderSize": 0,
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "minWidth": 20,
 "headerPaddingRight": 10,
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "verticalAlign": "middle",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "closeButtonBackgroundColorRatios": [
  0.73
 ],
 "bodyBackgroundColor": [
  "#FFFFFF"
 ],
 "titleFontWeight": "bold",
 "closeButtonPaddingBottom": 0,
 "titleFontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "closeButtonPaddingRight": 10,
 "titlePaddingBottom": 5,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "veilShowEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonIconColor": "#FFFFFF",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonBackgroundOpacity": 0,
 "closeButtonBorderRadius": 0,
 "headerBackgroundOpacity": 1,
 "children": [
  "this.htmlText_514D27ED_4D1A_7FBC_41C0_67E934B62983"
 ],
 "headerPaddingLeft": 10,
 "closeButtonBorderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "veilColorRatios": [
  0,
  1
 ],
 "shadowColor": "#000000",
 "closeButtonPressedIconColor": "#FFFFFF",
 "bodyBorderColor": "#FFFFFF",
 "titleTextDecoration": "none",
 "closeButtonPressedBorderColor": "#000000",
 "closeButtonPressedIconLineWidth": 3,
 "layout": "vertical",
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonRollOverBackgroundOpacity": 0,
 "bodyPaddingBottom": 5,
 "bodyBackgroundColorRatios": [
  0
 ],
 "hideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "shadowOpacity": 0.5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#FF9900"
 ],
 "closeButtonPaddingTop": 0,
 "borderRadius": 5,
 "closeButtonIconHeight": 24,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBorderSize": 0,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "borderSize": 0,
 "backgroundColorRatios": [],
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColor": [
  "#FFFFFF"
 ],
 "bodyPaddingLeft": 5,
 "closeButtonRollOverIconLineWidth": 3,
 "closeButtonIconWidth": 24,
 "closeButtonIconLineWidth": 3,
 "shadowVerticalLength": 0,
 "headerBorderColor": "#000000",
 "bodyBorderSize": 0,
 "footerBackgroundColorRatios": [
  0
 ],
 "bodyBackgroundColorDirection": "vertical",
 "headerPaddingBottom": 10,
 "footerBackgroundColor": [
  "#FF9900"
 ],
 "data": {
  "name": "Window18120"
 },
 "gap": 10,
 "closeButtonBorderColor": "#000000",
 "paddingBottom": 0,
 "headerVerticalAlign": "middle",
 "paddingTop": 0
},
{
 "id": "window_55913FB3_4EEA_0FA4_4191_6F6FBE11964E",
 "width": 400,
 "class": "Window",
 "bodyBackgroundOpacity": 1,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "shadowSpread": 1,
 "closeButtonRollOverBorderColor": "#000000",
 "footerBackgroundColorDirection": "vertical",
 "headerBackgroundColorRatios": [
  0,
  0
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "titleFontFamily": "Poppins ExtraBold",
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "footerBorderColor": "#FDEC8B",
 "bodyPaddingRight": 5,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "titleFontSize": "3vh",
 "titleFontColor": "#FFFFFF",
 "titlePaddingTop": 5,
 "closeButtonPressedBackgroundOpacity": 0,
 "closeButtonRollOverBorderSize": 0,
 "modal": true,
 "headerBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "shadowHorizontalLength": 3,
 "footerBackgroundOpacity": 1,
 "footerBorderSize": 0,
 "veilOpacity": 0.4,
 "height": 300,
 "minHeight": 20,
 "title": "Titik 9: Gazebo Sulaiman",
 "footerHeight": 5,
 "closeButtonPaddingLeft": 10,
 "backgroundColor": [],
 "propagateClick": false,
 "titlePaddingRight": 5,
 "veilColorDirection": "horizontal",
 "headerBorderSize": 0,
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "minWidth": 20,
 "headerPaddingRight": 10,
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "verticalAlign": "middle",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "closeButtonBackgroundColorRatios": [
  0.73
 ],
 "bodyBackgroundColor": [
  "#FFFFFF"
 ],
 "titleFontWeight": "bold",
 "closeButtonPaddingBottom": 0,
 "titleFontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "closeButtonPaddingRight": 10,
 "titlePaddingBottom": 5,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "veilShowEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonIconColor": "#FFFFFF",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonBackgroundOpacity": 0,
 "closeButtonBorderRadius": 0,
 "headerBackgroundOpacity": 1,
 "children": [
  "this.htmlText_55974FB3_4EEA_0FA4_41C5_1A942E4A1FF5"
 ],
 "headerPaddingLeft": 10,
 "closeButtonBorderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "veilColorRatios": [
  0,
  1
 ],
 "shadowColor": "#000000",
 "closeButtonPressedIconColor": "#FFFFFF",
 "bodyBorderColor": "#FFFFFF",
 "titleTextDecoration": "none",
 "closeButtonPressedBorderColor": "#000000",
 "closeButtonPressedIconLineWidth": 3,
 "layout": "vertical",
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonRollOverBackgroundOpacity": 0,
 "bodyPaddingBottom": 5,
 "bodyBackgroundColorRatios": [
  0
 ],
 "hideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "shadowOpacity": 0.5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#FF9900"
 ],
 "closeButtonPaddingTop": 0,
 "borderRadius": 5,
 "closeButtonIconHeight": 24,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBorderSize": 0,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "borderSize": 0,
 "backgroundColorRatios": [],
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColor": [
  "#FFFFFF"
 ],
 "bodyPaddingLeft": 5,
 "closeButtonRollOverIconLineWidth": 3,
 "closeButtonIconWidth": 24,
 "closeButtonIconLineWidth": 3,
 "shadowVerticalLength": 0,
 "headerBorderColor": "#000000",
 "bodyBorderSize": 0,
 "footerBackgroundColorRatios": [
  0
 ],
 "bodyBackgroundColorDirection": "vertical",
 "headerPaddingBottom": 10,
 "footerBackgroundColor": [
  "#FF9900"
 ],
 "data": {
  "name": "Window23356"
 },
 "gap": 10,
 "closeButtonBorderColor": "#000000",
 "paddingBottom": 0,
 "headerVerticalAlign": "middle",
 "paddingTop": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_1135AE32_0E7E_E581_4165_7567158085FA_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_890049A9_867D_6BA8_41E0_298FC5AD36B3",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 83.07,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_965B7A32_867D_68B9_41DD_5B0D4AB8E935",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 28.59,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 6 view pantai(2)",
 "id": "panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_1C7375F7_0E59_268F_4180_AD3BECF39FB9",
  "this.overlay_126B9863_0E59_ED86_41A0_FD14283EFDA3",
  "this.overlay_1116E0C8_0E49_3E81_419E_1448A09BC62C",
  "this.panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_19C50517_0EFF_278F_418F_A1A6D818ED77",
   "yaw": -139.61,
   "backwardYaw": -151.41,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_19C5D87C_0EFF_6D81_4192_778A4793128C",
   "yaw": -67.43,
   "backwardYaw": 81.48,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_19C52053_0EFF_5D87_4196_595FEE001077",
   "yaw": 34.26,
   "backwardYaw": -13.4,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8B9D67E0_867D_67D9_41CF_5F3FB22FAFB0",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -49.04,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_19C52053_0EFF_5D87_4196_595FEE001077_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 7 view pantai",
 "id": "panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_1AC3132A_0ACF_2387_4190_E5EBC30DF61C",
  "this.overlay_1321742B_0E49_2587_419D_067369BB4B5A",
  "this.panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_08B36D2B_05B9_2786_417C_E427144A44E5",
   "yaw": 76.94,
   "backwardYaw": 32.45,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_18A51027_0EF9_3D8F_4187_38630AC4D588",
   "yaw": -105.56,
   "backwardYaw": -96.93,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BEA2AD4_867D_69F8_41B6_27F1D550DD2C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -98.07,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_881F384B_867D_68EF_41D5_9C069C10A627",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 56.74,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 1 (1)",
 "id": "panorama_15C2515F_0E49_3FBF_4197_AB506B14A635",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_0F1E5E2E_2CEF_08DF_41A1_B2EDA11B82A1",
  "this.panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE",
   "yaw": -6.14,
   "backwardYaw": -57.44,
   "distance": 1
  }
 ],
 "hfov": 360,
 "mapLocations": [
  {
   "map": "this.map_7FDF4563_5A69_5A28_41CB_6937066B3391",
   "class": "PanoramaMapLocation",
   "angle": 122.47,
   "y": 117.15,
   "x": 259.32
  }
 ],
 "partial": false
},
{
 "class": "FadeInEffect",
 "easing": "quad_in",
 "id": "effect_7CF2A688_5CC3_45FE_4192_C6A9CA5912C2",
 "duration": 500
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "titik 4 kapal lantai 2",
 "id": "panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_3CCB6C65_2CBB_0945_419B_4F68D185ABD8",
  "this.overlay_3DBC849E_2CB9_39C7_4187_DD4C2088B656",
  "this.panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1539EF00_0E49_6381_41A6_6AD6645EA450",
   "yaw": -6.14,
   "backwardYaw": 67.86,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_15C25C28_0E49_6581_418D_F485BF9783EC_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8B927B6F_867D_68A8_41C3_C13E4877BF88",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -95.8,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 6 jalan raya(1)",
 "id": "panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_1ECF1772_0EC7_2381_41A6_3F991593EF29",
  "this.overlay_1D648FB0_0EC7_6281_41A4_E786B70DE671",
  "this.panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4",
   "yaw": -174.13,
   "backwardYaw": 84.2,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1135AE32_0E7E_E581_4165_7567158085FA",
   "yaw": -3.42,
   "backwardYaw": -160.04,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88A638AB_867D_69AF_41C4_B1016C528220",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -5.46,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BC7C7C0_867D_67D9_41B7_2F31E994DF67",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 173.86,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_9629FA58_867D_68E9_41DB_CA21934A1B51",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 59.01,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88268BDD_867D_6FE8_41BE_04D177024D39",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.33,
  "pitch": 0
 }
},
{
 "id": "window_506F7A65_4EEE_70AC_41D0_B6248AF1A574",
 "width": 400,
 "class": "Window",
 "bodyBackgroundOpacity": 1,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "shadowSpread": 1,
 "closeButtonRollOverBorderColor": "#000000",
 "footerBackgroundColorDirection": "vertical",
 "headerBackgroundColorRatios": [
  0,
  0
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "titleFontFamily": "Poppins ExtraBold",
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "footerBorderColor": "#FDEC8B",
 "bodyPaddingRight": 5,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "titleFontSize": "3vh",
 "titleFontColor": "#FFFFFF",
 "titlePaddingTop": 5,
 "closeButtonPressedBackgroundOpacity": 0,
 "closeButtonRollOverBorderSize": 0,
 "modal": true,
 "headerBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "shadowHorizontalLength": 3,
 "footerBackgroundOpacity": 1,
 "footerBorderSize": 0,
 "veilOpacity": 0.4,
 "height": 300,
 "minHeight": 20,
 "title": "Titik 11: Pantai Alya",
 "footerHeight": 5,
 "closeButtonPaddingLeft": 10,
 "backgroundColor": [],
 "propagateClick": false,
 "titlePaddingRight": 5,
 "veilColorDirection": "horizontal",
 "headerBorderSize": 0,
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "minWidth": 20,
 "headerPaddingRight": 10,
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "verticalAlign": "middle",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "closeButtonBackgroundColorRatios": [
  0.73
 ],
 "bodyBackgroundColor": [
  "#FFFFFF"
 ],
 "titleFontWeight": "bold",
 "closeButtonPaddingBottom": 0,
 "titleFontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "closeButtonPaddingRight": 10,
 "titlePaddingBottom": 5,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "veilShowEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonIconColor": "#FFFFFF",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonBackgroundOpacity": 0,
 "closeButtonBorderRadius": 0,
 "headerBackgroundOpacity": 1,
 "children": [
  "this.htmlText_5069BA65_4EEE_70AC_41D0_36DEAE27F9CF"
 ],
 "headerPaddingLeft": 10,
 "closeButtonBorderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "veilColorRatios": [
  0,
  1
 ],
 "shadowColor": "#000000",
 "closeButtonPressedIconColor": "#FFFFFF",
 "bodyBorderColor": "#FFFFFF",
 "titleTextDecoration": "none",
 "closeButtonPressedBorderColor": "#000000",
 "closeButtonPressedIconLineWidth": 3,
 "layout": "vertical",
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonRollOverBackgroundOpacity": 0,
 "bodyPaddingBottom": 5,
 "bodyBackgroundColorRatios": [
  0
 ],
 "hideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "shadowOpacity": 0.5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#FF9900"
 ],
 "closeButtonPaddingTop": 0,
 "borderRadius": 5,
 "closeButtonIconHeight": 24,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBorderSize": 0,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "borderSize": 0,
 "backgroundColorRatios": [],
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColor": [
  "#FFFFFF"
 ],
 "bodyPaddingLeft": 5,
 "closeButtonRollOverIconLineWidth": 3,
 "closeButtonIconWidth": 24,
 "closeButtonIconLineWidth": 3,
 "shadowVerticalLength": 0,
 "headerBorderColor": "#000000",
 "bodyBorderSize": 0,
 "footerBackgroundColorRatios": [
  0
 ],
 "bodyBackgroundColorDirection": "vertical",
 "headerPaddingBottom": 10,
 "footerBackgroundColor": [
  "#FF9900"
 ],
 "data": {
  "name": "Window25907"
 },
 "gap": 10,
 "closeButtonBorderColor": "#000000",
 "paddingBottom": 0,
 "headerVerticalAlign": "middle",
 "paddingTop": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 4 ke 5 (jalan raya)",
 "id": "panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_169C1ABE_0E47_6281_4192_B01AE8A3311F",
  "this.overlay_14A8007E_0E4F_DD81_417C_4174B4BF5981",
  "this.panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE",
   "yaw": -30.2,
   "backwardYaw": 49.24,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1135AE32_0E7E_E581_4165_7567158085FA",
   "yaw": 156.38,
   "backwardYaw": 20.19,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "vfov": 180,
 "label": "Titik 9",
 "id": "panorama_0E4C7505_0571_2B10_418D_58B200FF616A",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_16757ECB_0597_1910_4189_0DB0F824595B",
  "this.overlay_115F7828_0597_1911_4182_46848936DE88",
  "this.overlay_559632A4_4EEA_71AC_41CF_CA64F2FFF7CB",
  "this.panorama_0E4C7505_0571_2B10_418D_58B200FF616A_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E42CECD_0571_1913_4164_CCF35AE78A87",
   "yaw": -75.14,
   "backwardYaw": 7.03,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E6ECE99_0571_F930_4187_CDDECD89D395",
   "yaw": 86.47,
   "backwardYaw": -78.32,
   "distance": 1
  }
 ],
 "hfov": 360,
 "mapLocations": [
  {
   "map": "this.map_7FDF4563_5A69_5A28_41CB_6937066B3391",
   "class": "PanoramaMapLocation",
   "angle": 166.23,
   "y": 740.67,
   "x": 563.29
  }
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88EFFC07_867D_6867_41DA_3917542BF589",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 41.73,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8921B973_867D_68B8_41D6_E0C8B277F7C4",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 101.68,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88782B87_867D_6858_41B5_E46A392333FB",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 122.56,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_966C8A28_867D_68A9_419A_9576E8BFCDBE",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -5.91,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BEDAAE3_867D_69D8_41D3_100092D91DC8",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -64.02,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_882A3BD2_867D_6FF8_41C4_81901A60856F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -130.76,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 6 jalan raya",
 "id": "panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_1FFD99E6_0EC9_2E81_418B_F61C80A43F04",
  "this.overlay_1F085846_0ECE_ED81_4166_4B77CE9B75CC",
  "this.overlay_1185CBE9_0E4B_6283_4197_F3BC9122E385",
  "this.overlay_56BB71B1_4D1E_13A4_41A1_AF15A9B00A35",
  "this.panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59",
   "yaw": 84.2,
   "backwardYaw": -174.13,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_19C5D87C_0EFF_6D81_4192_778A4793128C",
   "yaw": -7.96,
   "backwardYaw": -123.26,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8",
   "yaw": -96.93,
   "backwardYaw": 94.19,
   "distance": 1
  }
 ],
 "hfov": 360,
 "mapLocations": [
  {
   "map": "this.map_7FDF4563_5A69_5A28_41CB_6937066B3391",
   "class": "PanoramaMapLocation",
   "angle": 5.66,
   "y": 738.94,
   "x": 1165.45
  }
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88543BB3_867D_6FB8_41DA_A649DF251C6F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 172.04,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BB47B4D_867D_68E8_41D1_F19338CF4443",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 42.21,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_880D0857_867D_68E7_41DF_0387563E5966",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -85.81,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_967CAA1A_867D_6869_41DF_252A82592DAD",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -93.53,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8911F990_867D_6878_41E0_51D717C92DAD",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -112.14,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BD81797_867D_5878_41C1_31F141DD4CA9",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 83.52,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 2-4 (2)",
 "id": "panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_398522EF_2CA9_1945_41C2_3051D4A3C3CD",
  "this.overlay_3972F4DA_2CAB_194F_41B8_2A5FAE729687",
  "this.panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773",
   "yaw": 6.12,
   "backwardYaw": -122.36,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15CD94F3_0E47_6687_4178_848F8F9858B3",
   "yaw": 168.19,
   "backwardYaw": 10.2,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88F09BFD_867D_6FAB_41DD_613049258F68",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -46.77,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88DD6C15_867D_687B_41DE_C60666841EED",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -130.76,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 1 (2)",
 "id": "panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_0E9F8976_2CE9_0B47_417D_D171A518DD55",
  "this.overlay_0F731134_2CE8_F8DB_418A_452F1474A018",
  "this.panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134",
   "yaw": 108.26,
   "backwardYaw": 12.02,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15C2515F_0E49_3FBF_4197_AB506B14A635",
   "yaw": -57.44,
   "backwardYaw": -6.14,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "jalan 10-9",
 "id": "panorama_0E6ECE99_0571_F930_4187_CDDECD89D395",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_1692E6D0_05B2_E931_4195_8B8420C330E8",
  "this.overlay_164A62AB_0591_2917_4192_025199572618",
  "this.panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E4C7505_0571_2B10_418D_58B200FF616A",
   "yaw": -78.32,
   "backwardYaw": 86.47,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85",
   "yaw": 81.93,
   "backwardYaw": 174.09,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "vfov": 180,
 "label": "Titik 7 homestay view pantai",
 "id": "panorama_08B36D2B_05B9_2786_417C_E427144A44E5",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_19BEA703_0ACB_2387_4169_096E9B51A98A",
  "this.overlay_19A8E826_0ACB_2D81_4190_E17CBCD36321",
  "this.overlay_47CD8951_524C_E62C_41AD_61B2FEE4099F",
  "this.panorama_08B36D2B_05B9_2786_417C_E427144A44E5_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2",
   "yaw": 32.45,
   "backwardYaw": 76.94,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE",
   "yaw": 152.55,
   "backwardYaw": 32.25,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE",
   "yaw": 157.14,
   "backwardYaw": 32.25,
   "distance": 1
  }
 ],
 "hfov": 360,
 "mapLocations": [
  {
   "map": "this.map_7FDF4563_5A69_5A28_41CB_6937066B3391",
   "class": "PanoramaMapLocation",
   "angle": 59.59,
   "y": 605.62,
   "x": 866.87
  }
 ],
 "partial": false
},
{
 "vfov": 180,
 "label": "Titik 6 ke 7",
 "id": "panorama_18A51027_0EF9_3D8F_4187_38630AC4D588",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_1D5BF920_0E47_2F81_4179_C22F3BB82538",
  "this.overlay_1311FBFA_0E47_2281_4193_0B99BE991C67",
  "this.panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2",
   "yaw": -96.93,
   "backwardYaw": -105.56,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_19C52053_0EFF_5D87_4196_595FEE001077",
   "yaw": 87.38,
   "backwardYaw": 160.01,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "vfov": 180,
 "label": "Titik 11 tikungan",
 "id": "panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_147BDA8B_0591_3910_4192_EDD447B28865",
  "this.overlay_17DDBAD2_0597_1930_416B_2E3E181BD664",
  "this.overlay_17E4DC66_058F_1911_4193_BD1B25E85E89",
  "this.overlay_5159EA8F_4EEE_307C_41C1_1A3AF9C9B8D4",
  "this.panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E4E731A_0571_6F31_4162_D4BA007223D8",
   "yaw": 66.95,
   "backwardYaw": -169.12,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85",
   "yaw": 115.98,
   "backwardYaw": -20.21,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E6A508E_0571_E910_4182_3FA194973CF0",
   "yaw": -120.99,
   "backwardYaw": 170.84,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_9639AA4C_867D_68E9_41E0_88C909D5CC57",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 166.6,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 2 (2)",
 "id": "panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_36FB9F0C_2CD9_08CB_41B0_9ABFB17BC83C",
  "this.overlay_379995A7_2CDF_1BC5_41B5_9BEB9E0B6D77",
  "this.overlay_371F176C_2CDF_074B_41B6_2A4C4680A4BD",
  "this.overlay_3676585F_2CD9_0945_41C5_0736F101DD65",
  "this.panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15C262D9_0E49_6283_4181_A0951E3715F8",
   "yaw": 106.9,
   "backwardYaw": 161.38,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15C25C28_0E49_6581_418D_F485BF9783EC",
   "yaw": -76.96,
   "backwardYaw": 159.11,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813",
   "yaw": -129.17,
   "backwardYaw": 130.96,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15CDCACE_0E46_E281_419B_D1DF72349238"
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_89539921_867D_6858_417F_0B58AA83C7F0",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -30.88,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_897668EE_867D_69A8_41DF_F704106C3275",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -23.62,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_89FFA9B6_867D_6BB8_41DE_5F5C42C76B3E",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 127.1,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88C9C88B_867D_686F_41C8_266CC24B2BF1",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -14.08,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 2-4 (3)",
 "id": "panorama_15CD94F3_0E47_6687_4178_848F8F9858B3",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_3F09F1DA_2CAF_FB4F_41B3_2BCE8F5B1539",
  "this.overlay_384B9251_2CAF_395D_41C4_11925B9939FD",
  "this.panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1528DFC3_0E47_6287_4168_2A5FED85E797",
   "yaw": -155.95,
   "backwardYaw": -20.21,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065",
   "yaw": 10.2,
   "backwardYaw": 168.19,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88030BF3_867D_6FB8_419C_272505295167",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 15.42,
  "pitch": 0
 }
},
{
 "id": "window_548BC044_4D26_70EC_41D0_F9B6D8F93E95",
 "width": 400,
 "class": "Window",
 "bodyBackgroundOpacity": 1,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "shadowSpread": 1,
 "closeButtonRollOverBorderColor": "#000000",
 "footerBackgroundColorDirection": "vertical",
 "headerBackgroundColorRatios": [
  0,
  0
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "titleFontFamily": "Poppins ExtraBold",
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "footerBorderColor": "#FDEC8B",
 "bodyPaddingRight": 5,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "titleFontSize": "3vh",
 "titleFontColor": "#FFFFFF",
 "titlePaddingTop": 5,
 "closeButtonPressedBackgroundOpacity": 0,
 "closeButtonRollOverBorderSize": 0,
 "modal": true,
 "headerBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "shadowHorizontalLength": 3,
 "footerBackgroundOpacity": 1,
 "footerBorderSize": 0,
 "veilOpacity": 0.4,
 "height": 300,
 "minHeight": 20,
 "title": "Titik 4: Homestay RK Mazlan Amin",
 "footerHeight": 5,
 "closeButtonPaddingLeft": 10,
 "backgroundColor": [],
 "propagateClick": false,
 "titlePaddingRight": 5,
 "veilColorDirection": "horizontal",
 "headerBorderSize": 0,
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "minWidth": 20,
 "headerPaddingRight": 10,
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "verticalAlign": "middle",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "closeButtonBackgroundColorRatios": [
  0.73
 ],
 "bodyBackgroundColor": [
  "#FFFFFF"
 ],
 "titleFontWeight": "bold",
 "closeButtonPaddingBottom": 0,
 "titleFontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "closeButtonPaddingRight": 10,
 "titlePaddingBottom": 5,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "veilShowEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonIconColor": "#FFFFFF",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonBackgroundOpacity": 0,
 "closeButtonBorderRadius": 0,
 "headerBackgroundOpacity": 1,
 "children": [
  "this.htmlText_548D3044_4D26_70EC_41C4_A71B0DF7472D"
 ],
 "headerPaddingLeft": 10,
 "closeButtonBorderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "veilColorRatios": [
  0,
  1
 ],
 "shadowColor": "#000000",
 "closeButtonPressedIconColor": "#FFFFFF",
 "bodyBorderColor": "#FFFFFF",
 "titleTextDecoration": "none",
 "closeButtonPressedBorderColor": "#000000",
 "closeButtonPressedIconLineWidth": 3,
 "layout": "vertical",
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonRollOverBackgroundOpacity": 0,
 "bodyPaddingBottom": 5,
 "bodyBackgroundColorRatios": [
  0
 ],
 "hideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "shadowOpacity": 0.5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#FF9900"
 ],
 "closeButtonPaddingTop": 0,
 "borderRadius": 5,
 "closeButtonIconHeight": 24,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBorderSize": 0,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "borderSize": 0,
 "backgroundColorRatios": [],
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColor": [
  "#FFFFFF"
 ],
 "bodyPaddingLeft": 5,
 "closeButtonRollOverIconLineWidth": 3,
 "closeButtonIconWidth": 24,
 "closeButtonIconLineWidth": 3,
 "shadowVerticalLength": 0,
 "headerBorderColor": "#000000",
 "bodyBorderSize": 0,
 "footerBackgroundColorRatios": [
  0
 ],
 "bodyBackgroundColorDirection": "vertical",
 "headerPaddingBottom": 10,
 "footerBackgroundColor": [
  "#FF9900"
 ],
 "data": {
  "name": "Window16631"
 },
 "gap": 10,
 "closeButtonBorderColor": "#000000",
 "paddingBottom": 0,
 "headerVerticalAlign": "middle",
 "paddingTop": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_1528A598_0E47_2682_419F_D4D43FD887F8_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "id": "window_5676D46A_4D1E_30A7_41B4_E1892FAEB405",
 "width": 400,
 "class": "Window",
 "bodyBackgroundOpacity": 1,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "shadowSpread": 1,
 "closeButtonRollOverBorderColor": "#000000",
 "footerBackgroundColorDirection": "vertical",
 "headerBackgroundColorRatios": [
  0,
  0
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "titleFontFamily": "Poppins ExtraBold",
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "footerBorderColor": "#FDEC8B",
 "bodyPaddingRight": 5,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "titleFontSize": "3vh",
 "titleFontColor": "#FFFFFF",
 "titlePaddingTop": 5,
 "closeButtonPressedBackgroundOpacity": 0,
 "closeButtonRollOverBorderSize": 0,
 "modal": true,
 "headerBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "shadowHorizontalLength": 3,
 "footerBackgroundOpacity": 1,
 "footerBorderSize": 0,
 "veilOpacity": 0.4,
 "height": 300,
 "minHeight": 20,
 "title": "Titik 6: Tempat Parkir",
 "footerHeight": 5,
 "closeButtonPaddingLeft": 10,
 "backgroundColor": [],
 "propagateClick": false,
 "titlePaddingRight": 5,
 "veilColorDirection": "horizontal",
 "headerBorderSize": 0,
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "minWidth": 20,
 "headerPaddingRight": 10,
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "verticalAlign": "middle",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "closeButtonBackgroundColorRatios": [
  0.73
 ],
 "bodyBackgroundColor": [
  "#FFFFFF"
 ],
 "titleFontWeight": "bold",
 "closeButtonPaddingBottom": 0,
 "titleFontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "closeButtonPaddingRight": 10,
 "titlePaddingBottom": 5,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "veilShowEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonIconColor": "#FFFFFF",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonBackgroundOpacity": 0,
 "closeButtonBorderRadius": 0,
 "headerBackgroundOpacity": 1,
 "children": [
  "this.htmlText_5671146A_4D1E_30A7_41D0_BDB43515E01D"
 ],
 "headerPaddingLeft": 10,
 "closeButtonBorderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "veilColorRatios": [
  0,
  1
 ],
 "shadowColor": "#000000",
 "closeButtonPressedIconColor": "#FFFFFF",
 "bodyBorderColor": "#FFFFFF",
 "titleTextDecoration": "none",
 "closeButtonPressedBorderColor": "#000000",
 "closeButtonPressedIconLineWidth": 3,
 "layout": "vertical",
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonRollOverBackgroundOpacity": 0,
 "bodyPaddingBottom": 5,
 "bodyBackgroundColorRatios": [
  0
 ],
 "hideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "shadowOpacity": 0.5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#FF9900"
 ],
 "closeButtonPaddingTop": 0,
 "borderRadius": 5,
 "closeButtonIconHeight": 24,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBorderSize": 0,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "borderSize": 0,
 "backgroundColorRatios": [],
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColor": [
  "#FFFFFF"
 ],
 "bodyPaddingLeft": 5,
 "closeButtonRollOverIconLineWidth": 3,
 "closeButtonIconWidth": 24,
 "closeButtonIconLineWidth": 3,
 "shadowVerticalLength": 0,
 "headerBorderColor": "#000000",
 "bodyBorderSize": 0,
 "footerBackgroundColorRatios": [
  0
 ],
 "bodyBackgroundColorDirection": "vertical",
 "headerPaddingBottom": 10,
 "footerBackgroundColor": [
  "#FF9900"
 ],
 "data": {
  "name": "Window19461"
 },
 "gap": 10,
 "closeButtonBorderColor": "#000000",
 "paddingBottom": 0,
 "headerVerticalAlign": "middle",
 "paddingTop": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_89E149C4_867D_6BD8_41C6_EEBF1027BB81",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 46.29,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 11 pantai",
 "id": "panorama_0E4E731A_0571_6F31_4162_D4BA007223D8",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_17056276_0593_29F1_4193_0B5D87E38871",
  "this.panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78",
   "yaw": -169.12,
   "backwardYaw": 66.95,
   "distance": 1
  }
 ],
 "hfov": 360,
 "mapLocations": [
  {
   "map": "this.map_7FDF4563_5A69_5A28_41CB_6937066B3391",
   "class": "PanoramaMapLocation",
   "angle": 0,
   "y": 705.66,
   "x": 295.88
  }
 ],
 "partial": false
},
{
 "vfov": 180,
 "label": "Titik 7 homestay (3)",
 "id": "panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_07852E10_0AD9_2581_41A0_89B229B0D044",
  "this.overlay_188D9AFE_0ADB_2281_416C_461C58184AB9",
  "this.panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09916AFC_05BF_E281_4186_720CA74703AB",
   "yaw": -164.58,
   "backwardYaw": -96.48,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093",
   "yaw": 14.29,
   "backwardYaw": -1.15,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BAF67D5_867D_67FB_41BD_811E253C7065",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -20.89,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_08B36D2B_05B9_2786_417C_E427144A44E5_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BDEEB09_867D_6868_41C3_1A080C121185",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -103.06,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Gerbang",
 "id": "panorama_0E6A508E_0571_E910_4182_3FA194973CF0",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_0BA2E81E_0571_1930_416F_B1027F451770",
  "this.panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78",
   "yaw": 170.84,
   "backwardYaw": -120.99,
   "distance": 1
  }
 ],
 "hfov": 360,
 "mapLocations": [
  {
   "map": "this.map_7FDF4563_5A69_5A28_41CB_6937066B3391",
   "class": "PanoramaMapLocation",
   "angle": -167.81,
   "y": 1011.35,
   "x": 206.61
  }
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_891CBCC5_867D_69DB_41D4_FAA4ECCFEB43",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -26.34,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_898E2A0D_867D_686B_41BF_645444C3E010",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 86.7,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 108.83,
  "pitch": -0.05
 }
},
{
 "vfov": 180,
 "label": "Titik 8 pantai",
 "id": "panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_1D3C76D6_0591_2931_4190_FED2103EE451",
  "this.panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093",
   "yaw": -137.79,
   "backwardYaw": -90.58,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88542821_867D_685B_41CC_A67BC8C23FAB",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 170.84,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BD4BB15_867D_6878_41D1_DEC5D6823139",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -147.75,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88FC3869_867D_68AB_4173_48E1A78A3E5E",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -93.08,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "titik 7 homestay",
 "id": "panorama_09917766_05BF_2381_4162_44384798B870",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_09917766_05BF_2381_4162_44384798B870_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_09917766_05BF_2381_4162_44384798B870_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_1A5A7940_0AC9_6F81_4180_67B9CD4E925C",
  "this.overlay_1F63362B_0EC9_2587_4188_CECF50FEB255",
  "this.panorama_09917766_05BF_2381_4162_44384798B870_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09916AFC_05BF_E281_4186_720CA74703AB",
   "yaw": 133.23,
   "backwardYaw": 86.92,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8",
   "yaw": -52.9,
   "backwardYaw": -83.77,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 8",
 "id": "panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_1132D0A6_059E_E910_4195_9C5DA97586E8",
  "this.overlay_102A1620_0591_2911_4168_ADFC815681B8",
  "this.overlay_0781A725_0ADB_2383_4160_EDD05B1522BD",
  "this.overlay_557AEF6E_4EE6_10BC_41C4_5C2678FAFE4B",
  "this.panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544",
   "yaw": -1.15,
   "backwardYaw": 14.29,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E42CECD_0571_1913_4164_CCF35AE78A87",
   "yaw": 174.54,
   "backwardYaw": -173.66,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA",
   "yaw": -90.58,
   "backwardYaw": -137.79,
   "distance": 1
  }
 ],
 "hfov": 360,
 "mapLocations": [
  {
   "map": "this.map_7FDF4563_5A69_5A28_41CB_6937066B3391",
   "class": "PanoramaMapLocation",
   "angle": 94.54,
   "y": 740.28,
   "x": 729.7
  }
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88957C55_867D_68FB_41D6_D21ABEE602B9",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -11.81,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88C7B896_867D_6879_41B9_60704CF78992",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -99.43,
  "pitch": 0
 }
},
{
 "id": "window_5284AC27_4EE6_30AC_41A7_0AC7C6061A3E",
 "width": 400,
 "class": "Window",
 "bodyBackgroundOpacity": 1,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "shadowSpread": 1,
 "closeButtonRollOverBorderColor": "#000000",
 "footerBackgroundColorDirection": "vertical",
 "headerBackgroundColorRatios": [
  0,
  0
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "titleFontFamily": "Poppins ExtraBold",
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "footerBorderColor": "#FDEC8B",
 "bodyPaddingRight": 5,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "titleFontSize": "3vh",
 "titleFontColor": "#FFFFFF",
 "titlePaddingTop": 5,
 "closeButtonPressedBackgroundOpacity": 0,
 "closeButtonRollOverBorderSize": 0,
 "modal": true,
 "headerBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "shadowHorizontalLength": 3,
 "footerBackgroundOpacity": 1,
 "footerBorderSize": 0,
 "veilOpacity": 0.4,
 "height": 300,
 "minHeight": 20,
 "title": "Titik 8: GazeboAlo",
 "footerHeight": 5,
 "closeButtonPaddingLeft": 10,
 "backgroundColor": [],
 "propagateClick": false,
 "titlePaddingRight": 5,
 "veilColorDirection": "horizontal",
 "headerBorderSize": 0,
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "minWidth": 20,
 "headerPaddingRight": 10,
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "verticalAlign": "middle",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "closeButtonBackgroundColorRatios": [
  0.73
 ],
 "bodyBackgroundColor": [
  "#FFFFFF"
 ],
 "titleFontWeight": "bold",
 "closeButtonPaddingBottom": 0,
 "titleFontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "closeButtonPaddingRight": 10,
 "titlePaddingBottom": 5,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "veilShowEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonIconColor": "#FFFFFF",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonBackgroundOpacity": 0,
 "closeButtonBorderRadius": 0,
 "headerBackgroundOpacity": 1,
 "children": [
  "this.htmlText_52866C27_4EE6_30AC_41C5_08E4D3AC517E"
 ],
 "headerPaddingLeft": 10,
 "closeButtonBorderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "veilColorRatios": [
  0,
  1
 ],
 "shadowColor": "#000000",
 "closeButtonPressedIconColor": "#FFFFFF",
 "bodyBorderColor": "#FFFFFF",
 "titleTextDecoration": "none",
 "closeButtonPressedBorderColor": "#000000",
 "closeButtonPressedIconLineWidth": 3,
 "layout": "vertical",
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonRollOverBackgroundOpacity": 0,
 "bodyPaddingBottom": 5,
 "bodyBackgroundColorRatios": [
  0
 ],
 "hideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "shadowOpacity": 0.5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#FF9900"
 ],
 "closeButtonPaddingTop": 0,
 "borderRadius": 5,
 "closeButtonIconHeight": 24,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBorderSize": 0,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "borderSize": 0,
 "backgroundColorRatios": [],
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColor": [
  "#FFFFFF"
 ],
 "bodyPaddingLeft": 5,
 "closeButtonRollOverIconLineWidth": 3,
 "closeButtonIconWidth": 24,
 "closeButtonIconLineWidth": 3,
 "shadowVerticalLength": 0,
 "headerBorderColor": "#000000",
 "bodyBorderSize": 0,
 "footerBackgroundColorRatios": [
  0
 ],
 "bodyBackgroundColorDirection": "vertical",
 "headerPaddingBottom": 10,
 "footerBackgroundColor": [
  "#FF9900"
 ],
 "data": {
  "name": "Window22087"
 },
 "gap": 10,
 "closeButtonBorderColor": "#000000",
 "paddingBottom": 0,
 "headerVerticalAlign": "middle",
 "paddingTop": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_964B2A3D_867D_68AB_41D5_879A21E38E8A",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -98.52,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_89608C79_867D_68AB_41BC_C33697C09269",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.79,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_09917766_05BF_2381_4162_44384798B870_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 2 (4)",
 "id": "panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_3B6686D4_2CD9_395B_41B9_265B977A9197",
  "this.overlay_34856B30_2CD9_08DB_41A2_663A78C4331D",
  "this.panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1528A598_0E47_2682_419F_D4D43FD887F8",
   "yaw": 47.43,
   "backwardYaw": -20.67,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15C262D9_0E49_6283_4181_A0951E3715F8",
   "yaw": 148.66,
   "backwardYaw": -14.31,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_89659908_867D_6868_41D3_1B5A4AA9713D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 64.45,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BA71B63_867D_68D8_41B0_47E784DE19BF",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -92.62,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8843282C_867D_68A9_41CC_00A4C19E5A64",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -147.55,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 1 (4)",
 "id": "panorama_152BA07A_0E46_FD81_41A1_67DE57E97658",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_3350A018_2CE9_18CB_41AC_91FFEC4E548D",
  "this.overlay_0CC762FF_2CE9_3946_41BD_10F7E70EABC4",
  "this.panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134",
   "yaw": 38.35,
   "backwardYaw": -170.48,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15CDCACE_0E46_E281_419B_D1DF72349238",
   "yaw": -160.49,
   "backwardYaw": 49.24,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "vfov": 180,
 "label": "Titik 1 (5)",
 "id": "panorama_15CDCACE_0E46_E281_419B_D1DF72349238",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_33D096CC_2CD7_194B_41BF_DF83117FB10C",
  "this.overlay_0DB45579_2CD7_3B4D_418E_967A4F05DD68",
  "this.panorama_15CDCACE_0E46_E281_419B_D1DF72349238_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_152BA07A_0E46_FD81_41A1_67DE57E97658",
   "yaw": 49.24,
   "backwardYaw": -160.49,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15C262D9_0E49_6283_4181_A0951E3715F8",
   "yaw": -114.19,
   "backwardYaw": 175.38,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_895E5C83_867D_685F_41DC_B7AA5400DBFC",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -9.16,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_890AFCE2_867D_69D9_41D9_41923A378043",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 173.86,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 7 homestay(2)",
 "id": "panorama_09916AFC_05BF_E281_4186_720CA74703AB",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_18A9220B_0AC6_FD86_4192_079F1B37EABD",
  "this.overlay_1A1131A4_0AC7_3E82_418B_E91B200626BA",
  "this.overlay_56C83A5F_4D1A_109C_41D0_50CDB79672CB",
  "this.overlay_4191D6DC_523C_EBD6_41C5_7B7E854FD6A6",
  "this.panorama_09916AFC_05BF_E281_4186_720CA74703AB_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544",
   "yaw": -96.48,
   "backwardYaw": -164.58,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09917766_05BF_2381_4162_44384798B870",
   "yaw": 86.92,
   "backwardYaw": 133.23,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE",
   "yaw": -9.16,
   "backwardYaw": -138.27,
   "distance": 1
  }
 ],
 "hfov": 360,
 "mapLocations": [
  {
   "map": "this.map_7FDF4563_5A69_5A28_41CB_6937066B3391",
   "class": "PanoramaMapLocation",
   "angle": 0,
   "y": 738.94,
   "x": 866.87
  }
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_9619DA6A_867D_68A8_41BC_357C3375F3E2",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 57.64,
  "pitch": 0
 }
},
{
 "id": "window_51DB66B4_4D1A_31AC_41B9_A7326A0C81FB",
 "width": 400,
 "class": "Window",
 "bodyBackgroundOpacity": 1,
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "shadowSpread": 1,
 "closeButtonRollOverBorderColor": "#000000",
 "footerBackgroundColorDirection": "vertical",
 "headerBackgroundColorRatios": [
  0,
  0
 ],
 "shadow": true,
 "scrollBarMargin": 2,
 "titleFontFamily": "Poppins ExtraBold",
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "footerBorderColor": "#FDEC8B",
 "bodyPaddingRight": 5,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "titleFontSize": "3vh",
 "titleFontColor": "#FFFFFF",
 "titlePaddingTop": 5,
 "closeButtonPressedBackgroundOpacity": 0,
 "closeButtonRollOverBorderSize": 0,
 "modal": true,
 "headerBackgroundColorDirection": "vertical",
 "bodyPaddingTop": 5,
 "shadowHorizontalLength": 3,
 "footerBackgroundOpacity": 1,
 "footerBorderSize": 0,
 "veilOpacity": 0.4,
 "height": 300,
 "minHeight": 20,
 "title": "Titik 7: Homestay AnR",
 "footerHeight": 5,
 "closeButtonPaddingLeft": 10,
 "backgroundColor": [],
 "propagateClick": false,
 "titlePaddingRight": 5,
 "veilColorDirection": "horizontal",
 "headerBorderSize": 0,
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "minWidth": 20,
 "headerPaddingRight": 10,
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "verticalAlign": "middle",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "closeButtonBackgroundColorRatios": [
  0.73
 ],
 "bodyBackgroundColor": [
  "#FFFFFF"
 ],
 "titleFontWeight": "bold",
 "closeButtonPaddingBottom": 0,
 "titleFontStyle": "normal",
 "backgroundColorDirection": "vertical",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "closeButtonPaddingRight": 10,
 "titlePaddingBottom": 5,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "veilShowEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonIconColor": "#FFFFFF",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonPressedBackgroundColorDirection": "vertical",
 "closeButtonBackgroundOpacity": 0,
 "closeButtonBorderRadius": 0,
 "headerBackgroundOpacity": 1,
 "children": [
  "this.htmlText_51D926B6_4D1A_31AF_41BF_BE0C603184D4"
 ],
 "headerPaddingLeft": 10,
 "closeButtonBorderSize": 0,
 "shadowBlurRadius": 6,
 "headerPaddingTop": 10,
 "veilColorRatios": [
  0,
  1
 ],
 "shadowColor": "#000000",
 "closeButtonPressedIconColor": "#FFFFFF",
 "bodyBorderColor": "#FFFFFF",
 "titleTextDecoration": "none",
 "closeButtonPressedBorderColor": "#000000",
 "closeButtonPressedIconLineWidth": 3,
 "layout": "vertical",
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "closeButtonRollOverBackgroundOpacity": 0,
 "bodyPaddingBottom": 5,
 "bodyBackgroundColorRatios": [
  0
 ],
 "hideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "shadowOpacity": 0.5,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#FF9900"
 ],
 "closeButtonPaddingTop": 0,
 "borderRadius": 5,
 "closeButtonIconHeight": 24,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "closeButtonPressedBorderSize": 0,
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "borderSize": 0,
 "backgroundColorRatios": [],
 "titlePaddingLeft": 5,
 "closeButtonRollOverBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColorDirection": "vertical",
 "closeButtonBackgroundColor": [
  "#FFFFFF"
 ],
 "bodyPaddingLeft": 5,
 "closeButtonRollOverIconLineWidth": 3,
 "closeButtonIconWidth": 24,
 "closeButtonIconLineWidth": 3,
 "shadowVerticalLength": 0,
 "headerBorderColor": "#000000",
 "bodyBorderSize": 0,
 "footerBackgroundColorRatios": [
  0
 ],
 "bodyBackgroundColorDirection": "vertical",
 "headerPaddingBottom": 10,
 "footerBackgroundColor": [
  "#FF9900"
 ],
 "data": {
  "name": "Window20797"
 },
 "gap": 10,
 "closeButtonBorderColor": "#000000",
 "paddingBottom": 0,
 "headerVerticalAlign": "middle",
 "paddingTop": 0
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_89AE59F8_867D_6BA8_418B_63AAA360DD74",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 65.81,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88B98C2D_867D_68AB_41C3_19FF668D634D",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 74.44,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BC9EB20_867D_6858_416A_B40AD162A1B8",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -147.75,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8943693B_867D_68AF_41D9_F0761FA45033",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -173.88,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BAC8B58_867D_68E8_41DD_996EF0164E3C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -145.74,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_15CDCACE_0E46_E281_419B_D1DF72349238_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "Map",
 "fieldOfViewOverlayInsideOpacity": 0.3,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "id": "map_7FDF4563_5A69_5A28_41CB_6937066B3391",
 "width": 1920,
 "label": "Map 2",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391.png",
    "class": "ImageResourceLevel",
    "width": 1920,
    "height": 1080
   },
   {
    "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_lq.png",
    "class": "ImageResourceLevel",
    "width": 341,
    "tags": "preload",
    "height": 192
   }
  ]
 },
 "thumbnailUrl": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_t.png",
 "overlays": [
  "this.overlay_7FDF3563_5A69_5A28_41B8_CD58A22DBDD0",
  "this.overlay_7FDF0563_5A69_5A28_41BE_A1A6A447D9BB",
  "this.overlay_7FDEE563_5A69_5A28_41D1_735DA38F2492",
  "this.overlay_7FDED563_5A69_5A28_41C1_0018A17AA771",
  "this.overlay_7FDEC563_5A69_5A28_41CB_7F73B6B30857",
  "this.overlay_7FDE7565_5A69_5A29_419F_2E68CDA096ED",
  "this.overlay_7FDE5565_5A69_5A29_41D1_36C4BAF25873",
  "this.overlay_7FDE3565_5A69_5A29_41D4_85ED679264B9",
  "this.overlay_7FDDE565_5A69_5A28_41BC_7E3D6A9D9F13",
  "this.overlay_551F6E18_74FE_1925_41B3_5A7F8BEB4CD4",
  "this.overlay_57FC913D_74FE_0B5F_41A1_109891D7044E",
  "this.overlay_5741054A_74FE_0B25_41DD_09A09EBC54CE",
  "this.overlay_50E10E3B_74FE_3964_41B2_19A948E11EA7",
  "this.overlay_50160385_74FE_0F2C_41AD_55995D2171D8",
  "this.overlay_5186C6FD_74FA_16DF_41D2_ED9214C62015"
 ],
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "scaleMode": "fit_inside",
 "maximumZoomFactor": 1.2,
 "initialZoomFactor": 1,
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "fieldOfViewOverlayRadiusScale": 0.1,
 "height": 1080
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_15C262D9_0E49_6283_4181_A0951E3715F8_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8872DB92_867D_6878_41D1_DAD3FE9C1091",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 103.04,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88A7FC45_867D_68DB_41D2_B4DD31B6D3FD",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 159.79,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_09916AFC_05BF_E281_4186_720CA74703AB_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "FadeInEffect",
 "easing": "quad_in",
 "id": "effect_7D91432D_57CA_B97E_419B_757E756EBFB9",
 "duration": 500
},
{
 "class": "FadeInEffect",
 "easing": "quad_in",
 "id": "effect_5636AD98_74FA_FB25_41CE_509AFDF36B8B",
 "duration": 500
},
{
 "vfov": 180,
 "label": "Titik 6 jalan raya(2)",
 "id": "panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_18170D1B_0ECB_2787_419A_6DD0A56AD0F7",
  "this.overlay_1E059997_0ECB_6E8F_4199_0AAD9EC48DB6",
  "this.panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4",
   "yaw": 94.19,
   "backwardYaw": -96.93,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09917766_05BF_2381_4162_44384798B870",
   "yaw": -83.77,
   "backwardYaw": -52.9,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "vfov": 180,
 "label": "Titik 3 (sebelah titik 2)",
 "id": "panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_312DE3EE_2CDB_3F46_41BF_0BF5143AB04D",
  "this.overlay_33B03C99_2CDB_09CD_41B5_C5BBEA7DCD35",
  "this.panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56",
   "yaw": 130.96,
   "backwardYaw": -129.17,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_15C25C28_0E49_6581_418D_F485BF9783EC",
   "yaw": 92.83,
   "backwardYaw": -93.3,
   "distance": 1
  }
 ],
 "hfov": 360,
 "mapLocations": [
  {
   "map": "this.map_7FDF4563_5A69_5A28_41CB_6937066B3391",
   "class": "PanoramaMapLocation",
   "angle": -86.75,
   "y": 444.78,
   "x": 147.55
  }
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_886E2B9D_867D_6868_41C3_0CAE5CB47B19",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -87.17,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_885A1BA8_867D_6FA8_41D7_D801A5B4E24A",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 103.95,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_96082A7B_867D_68AF_41CA_879CC2442ED3",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -169.8,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 6 pasir(2)",
 "id": "panorama_19C5D87C_0EFF_6D81_4192_778A4793128C",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_111952F8_0E4E_E281_41A0_FB03C172D293",
  "this.overlay_105A5A79_0E4F_6D83_4198_0CAADA20E57B",
  "this.panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4",
   "yaw": -123.26,
   "backwardYaw": -7.96,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D",
   "yaw": 81.48,
   "backwardYaw": -67.43,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "class": "PlayList",
 "items": [
  "this.PanoramaPlayListItem_8B354743_867D_58D8_41D5_D87A26FAC1B5",
  {
   "media": "this.panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_camera"
  },
  "this.PanoramaPlayListItem_8B292749_867D_58E8_41C8_F66925B5B81E",
  "this.PanoramaPlayListItem_8B298749_867D_58E8_41D6_D8B3D231E6C7",
  {
   "media": "this.panorama_0E6ECE99_0571_F930_4187_CDDECD89D395",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_camera"
  },
  "this.PanoramaPlayListItem_8B2A174A_867D_58E8_4162_063FED218433",
  {
   "media": "this.panorama_0E42CECD_0571_1913_4164_CCF35AE78A87",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_camera"
  },
  "this.PanoramaPlayListItem_8B2B474A_867D_58E8_41A5_71551A6D03DE",
  {
   "media": "this.panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_camera"
  },
  {
   "media": "this.panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_camera"
  },
  "this.PanoramaPlayListItem_8B2B974C_867D_58E8_41C9_2ACDBB64AC66",
  {
   "media": "this.panorama_09917766_05BF_2381_4162_44384798B870",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09917766_05BF_2381_4162_44384798B870_camera"
  },
  {
   "media": "this.panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_camera"
  },
  "this.PanoramaPlayListItem_8B2CF74D_867D_58E8_41D8_67771FE8B92D",
  {
   "media": "this.panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_camera"
  },
  {
   "media": "this.panorama_18A51027_0EF9_3D8F_4187_38630AC4D588",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_camera"
  },
  "this.PanoramaPlayListItem_8B2D374D_867D_58E8_41A4_8F065CDB019A",
  {
   "media": "this.panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_camera"
  },
  {
   "media": "this.panorama_19C50517_0EFF_278F_418F_A1A6D818ED77",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_camera"
  },
  {
   "media": "this.panorama_19C5D87C_0EFF_6D81_4192_778A4793128C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_camera"
  },
  {
   "media": "this.panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_camera"
  },
  "this.PanoramaPlayListItem_8B2F474E_867D_58E8_41D6_8A1FE0EA1618",
  {
   "media": "this.panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_camera"
  },
  "this.PanoramaPlayListItem_8B2E574F_867D_58E8_41E0_91D38DCAD095",
  {
   "media": "this.panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_camera"
  },
  {
   "media": "this.panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_camera"
  },
  "this.PanoramaPlayListItem_8B2F474F_867D_58E8_41D3_20EA5D357A5D",
  {
   "media": "this.panorama_1539EF00_0E49_6381_41A6_6AD6645EA450",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_camera"
  },
  {
   "media": "this.panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_camera"
  },
  {
   "media": "this.panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_camera"
  },
  {
   "media": "this.panorama_1528DFC3_0E47_6287_4168_2A5FED85E797",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_camera"
  },
  {
   "media": "this.panorama_15CD94F3_0E47_6687_4178_848F8F9858B3",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_camera"
  },
  {
   "media": "this.panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_camera"
  },
  {
   "media": "this.panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 34)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_camera"
  },
  "this.PanoramaPlayListItem_8B211751_867D_58F8_41CF_04D4FE25A15F",
  {
   "media": "this.panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 35, 36)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_camera"
  },
  {
   "media": "this.panorama_15C262D9_0E49_6283_4181_A0951E3715F8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 36, 37)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15C262D9_0E49_6283_4181_A0951E3715F8_camera"
  },
  {
   "media": "this.panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 37, 38)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_camera"
  },
  "this.PanoramaPlayListItem_8B222752_867D_58F8_41DD_3EF4EDB6842F",
  "this.PanoramaPlayListItem_8B228752_867D_58F8_41D6_407060EA6FDE",
  {
   "media": "this.panorama_15CDCACE_0E46_E281_419B_D1DF72349238",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 40, 41)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15CDCACE_0E46_E281_419B_D1DF72349238_camera"
  },
  {
   "media": "this.panorama_152BA07A_0E46_FD81_41A1_67DE57E97658",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_camera"
  },
  {
   "media": "this.panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 42, 43)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_camera"
  },
  {
   "media": "this.panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 43, 44)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_camera"
  },
  "this.PanoramaPlayListItem_8B240753_867D_58F8_41D7_4D9243067A3E"
 ],
 "id": "mainPlayList"
},
{
 "vfov": 180,
 "label": "Titik 4 dalam",
 "id": "panorama_1539EF00_0E49_6381_41A6_6AD6645EA450",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_2282244F_2CB9_1945_4199_1ACDEB3CA150",
  "this.overlay_3C8D206B_2CBB_394D_41BD_EB4017E0B4A1",
  "this.panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE",
   "yaw": 80.57,
   "backwardYaw": 153.66,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D",
   "yaw": 67.86,
   "backwardYaw": -6.14,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_894DDC8D_867D_686B_41BE_2C2EE9D15E4A",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -177.97,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BB197CB_867D_67EF_41C5_D9611EDFC394",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -18.62,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_893D1C97_867D_6867_41C1_F77317402ACE",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -132.57,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_899E6A03_867D_6858_41D1_35A458031B35",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 50.83,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "titik 4 kapal lantai 3",
 "id": "panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_3EC87CD5_2CA9_0945_417F_24F0D010A59E",
  "this.panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1539EF00_0E49_6381_41A6_6AD6645EA450"
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8877E808_867D_6868_41DC_97E9B9DC7BCC",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -27.45,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88A89C38_867D_68A9_41DD_C9F1AD951D86",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -19.99,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BD80AFF_867D_69A8_41DD_35A88C23272E",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -71.74,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_89D0A9CF_867D_6BE8_41D0_EB11C2B874E7",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 24.05,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BE3DAF3_867D_69B8_41DA_1816306F12AE",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -141.65,
  "pitch": 0
 }
},
{
 "class": "PlayList",
 "items": [
  {
   "media": "this.panorama_0E6A508E_0571_E910_4182_3FA194973CF0",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E6A508E_0571_E910_4182_3FA194973CF0_camera"
  },
  {
   "media": "this.panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_camera"
  },
  {
   "media": "this.panorama_0E4E731A_0571_6F31_4162_D4BA007223D8",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_camera"
  },
  {
   "media": "this.panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_camera"
  },
  {
   "media": "this.panorama_0E6ECE99_0571_F930_4187_CDDECD89D395",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_camera"
  },
  {
   "media": "this.panorama_0E4C7505_0571_2B10_418D_58B200FF616A",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E4C7505_0571_2B10_418D_58B200FF616A_camera"
  },
  {
   "media": "this.panorama_0E42CECD_0571_1913_4164_CCF35AE78A87",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_camera"
  },
  {
   "media": "this.panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_camera"
  },
  {
   "media": "this.panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_camera"
  },
  {
   "media": "this.panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 10)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_camera"
  },
  {
   "media": "this.panorama_09916AFC_05BF_E281_4186_720CA74703AB",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 10, 11)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09916AFC_05BF_E281_4186_720CA74703AB_camera"
  },
  {
   "media": "this.panorama_09917766_05BF_2381_4162_44384798B870",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 11, 12)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09917766_05BF_2381_4162_44384798B870_camera"
  },
  {
   "media": "this.panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 12, 13)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_camera"
  },
  {
   "media": "this.panorama_08B36D2B_05B9_2786_417C_E427144A44E5",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 13, 14)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_08B36D2B_05B9_2786_417C_E427144A44E5_camera"
  },
  {
   "media": "this.panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 14, 15)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_camera"
  },
  {
   "media": "this.panorama_18A51027_0EF9_3D8F_4187_38630AC4D588",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 15, 16)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_camera"
  },
  {
   "media": "this.panorama_19C52053_0EFF_5D87_4196_595FEE001077",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 16, 17)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_19C52053_0EFF_5D87_4196_595FEE001077_camera"
  },
  {
   "media": "this.panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 17, 18)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_camera"
  },
  {
   "media": "this.panorama_19C50517_0EFF_278F_418F_A1A6D818ED77",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 18, 19)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_camera"
  },
  {
   "media": "this.panorama_19C5D87C_0EFF_6D81_4192_778A4793128C",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 19, 20)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_camera"
  },
  {
   "media": "this.panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 20, 21)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_camera"
  },
  {
   "media": "this.panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 21, 22)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_camera"
  },
  {
   "media": "this.panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 22, 23)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_camera"
  },
  {
   "media": "this.panorama_1135AE32_0E7E_E581_4165_7567158085FA",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 23, 24)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1135AE32_0E7E_E581_4165_7567158085FA_camera"
  },
  {
   "media": "this.panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 24, 25)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_camera"
  },
  {
   "media": "this.panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 25, 26)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_camera"
  },
  {
   "media": "this.panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 26, 27)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_camera"
  },
  {
   "media": "this.panorama_1539EF00_0E49_6381_41A6_6AD6645EA450",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 27, 28)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_camera"
  },
  {
   "media": "this.panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 28, 29)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_camera"
  },
  {
   "media": "this.panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 29, 30)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_camera"
  },
  {
   "media": "this.panorama_1528DFC3_0E47_6287_4168_2A5FED85E797",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 30, 31)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_camera"
  },
  {
   "media": "this.panorama_15CD94F3_0E47_6687_4178_848F8F9858B3",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 31, 32)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_camera"
  },
  {
   "media": "this.panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 32, 33)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_camera"
  },
  {
   "media": "this.panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 33, 34)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_camera"
  },
  {
   "media": "this.panorama_1528A598_0E47_2682_419F_D4D43FD887F8",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 34, 35)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1528A598_0E47_2682_419F_D4D43FD887F8_camera"
  },
  {
   "media": "this.panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 35, 36)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_camera"
  },
  {
   "media": "this.panorama_15C262D9_0E49_6283_4181_A0951E3715F8",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 36, 37)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15C262D9_0E49_6283_4181_A0951E3715F8_camera"
  },
  {
   "media": "this.panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 37, 38)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_camera"
  },
  {
   "media": "this.panorama_15C25C28_0E49_6581_418D_F485BF9783EC",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 38, 39)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15C25C28_0E49_6581_418D_F485BF9783EC_camera"
  },
  {
   "media": "this.panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 39, 40)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_camera"
  },
  {
   "media": "this.panorama_15CDCACE_0E46_E281_419B_D1DF72349238",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 40, 41)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15CDCACE_0E46_E281_419B_D1DF72349238_camera"
  },
  {
   "media": "this.panorama_152BA07A_0E46_FD81_41A1_67DE57E97658",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 41, 42)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_camera"
  },
  {
   "media": "this.panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 42, 43)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_camera"
  },
  {
   "media": "this.panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 43, 44)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_camera"
  },
  {
   "media": "this.panorama_15C2515F_0E49_3FBF_4197_AB506B14A635",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 44, 0)",
   "class": "PanoramaPlayListItem",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_camera"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_89326956_867D_68F8_41D1_543B0AE18829",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -172.97,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_883CCBC8_867D_6FE8_41CB_A8CC3C1C4151",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 9.52,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_89BFE9E7_867D_6BD8_41D6_5FF70D6A57E0",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -73.1,
  "pitch": 0
 }
},
{
 "class": "PlayList",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "class": "MapPlayListItem",
   "media": "this.map_7FDF4563_5A69_5A28_41CB_6937066B3391",
   "player": "this.MapViewerMapPlayer"
  }
 ],
 "id": "playList_96FC06C8_867D_59E9_41CD_82CDB390E8C2"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8BC22B33_867D_68B8_41DE_58E47944DF0F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -165.71,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_0E6A508E_0571_E910_4182_3FA194973CF0_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 169.41,
  "pitch": -0.74
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_887997F9_867D_67AB_41B8_CD77E9B254F5",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -4.62,
  "pitch": 0
 }
},
{
 "class": "MapPlayer",
 "viewerArea": "this.MapViewer",
 "id": "MapViewerMapPlayer",
 "movementMode": "constrained"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_892DBCAE_867D_69A9_41D3_B070F98A4538",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 40.39,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 5 view pantai(1)",
 "id": "panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_1685A285_0E5B_2283_4183_644C942570B8",
  "this.overlay_540164B1_4D1A_31A4_41C9_BA2DABD6FB41",
  "this.panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1135AE32_0E7E_E581_4165_7567158085FA",
   "yaw": -115.55,
   "backwardYaw": -76.05,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "MediaAudio",
 "audio": {
  "class": "AudioResource",
  "mp3Url": "media/audio_687397BD_7A3B_ED6E_41B9_E4C7CBA4ECA0.mp3",
  "oggUrl": "media/audio_687397BD_7A3B_ED6E_41B9_E4C7CBA4ECA0.ogg"
 },
 "autoplay": true,
 "id": "audio_687397BD_7A3B_ED6E_41B9_E4C7CBA4ECA0",
 "data": {
  "label": "Lagu"
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_897818CD_867D_69EB_41D3_D33DD11CF14C",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 176.58,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88204841_867D_68DB_41C6_6074C26D08F7",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 5.87,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 1 (3)",
 "id": "panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_0D9D8050_2CEB_195B_41B9_1586DE66486A",
  "this.overlay_0E175FB8_2CE9_07CB_4198_948C904764F6",
  "this.panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_152BA07A_0E46_FD81_41A1_67DE57E97658",
   "yaw": -170.48,
   "backwardYaw": 38.35,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE",
   "yaw": 12.02,
   "backwardYaw": 108.26,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "vfov": 180,
 "label": "Titik 2 (1)",
 "id": "panorama_15C25C28_0E49_6581_418D_F485BF9783EC",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_37641C23_2CD9_08FD_4192_0E647D69F8A2",
  "this.overlay_32847C0D_2CDB_08C5_4197_FF9ECD79F1A6",
  "this.panorama_15C25C28_0E49_6581_418D_F485BF9783EC_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56",
   "yaw": 159.11,
   "backwardYaw": -76.96,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813",
   "yaw": -93.3,
   "backwardYaw": 92.83,
   "distance": 1
  }
 ],
 "hfov": 360,
 "mapLocations": [
  {
   "map": "this.map_7FDF4563_5A69_5A28_41CB_6937066B3391",
   "class": "PanoramaMapLocation",
   "angle": -84.88,
   "y": 347.63,
   "x": 147.55
  }
 ],
 "partial": false
},
{
 "vfov": 180,
 "label": "Titik 7 homestay(1)",
 "id": "panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_1A2F1118_0ACA_DF82_418C_F886B3A50C36",
  "this.overlay_456563D6_5235_29D5_41AD_BA37FCE30D4B",
  "this.overlay_41B0B0DA_5237_27DD_41C2_3558457BC6EA",
  "this.panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_08B36D2B_05B9_2786_417C_E427144A44E5",
   "yaw": 32.25,
   "backwardYaw": 152.55,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_08B36D2B_05B9_2786_417C_E427144A44E5",
   "yaw": 32.98,
   "backwardYaw": 152.55,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_09916AFC_05BF_E281_4186_720CA74703AB",
   "yaw": -138.27,
   "backwardYaw": -9.16,
   "distance": 1
  }
 ],
 "hfov": 360,
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 6 view pantai",
 "id": "panorama_19C52053_0EFF_5D87_4196_595FEE001077",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_1C13970B_0E59_6387_41A6_17C9973C092B",
  "this.overlay_1C680D42_0E5B_E781_417A_638E4774FEE8",
  "this.panorama_19C52053_0EFF_5D87_4196_595FEE001077_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D",
   "yaw": -13.4,
   "backwardYaw": 34.26,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_18A51027_0EF9_3D8F_4187_38630AC4D588",
   "yaw": 160.01,
   "backwardYaw": 87.38,
   "distance": 1
  }
 ],
 "hfov": 360,
 "mapLocations": [
  {
   "map": "this.map_7FDF4563_5A69_5A28_41CB_6937066B3391",
   "class": "PanoramaMapLocation",
   "angle": 107.71,
   "y": 605.62,
   "x": 1035.02
  }
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_889678B5_867D_69BB_41D5_E67016172A99",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 89.42,
  "pitch": 0
 }
},
{
 "vfov": 180,
 "label": "Titik 10 jalan",
 "id": "panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85",
 "class": "Panorama",
 "hfovMax": 130,
 "pitch": 0,
 "thumbnailUrl": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 4,
      "width": 2048,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "colCount": 2,
      "width": 1024,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "colCount": 1,
      "width": 512,
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "overlays": [
  "this.overlay_1706CE31_058F_1970_4193_F9377D70E48E",
  "this.overlay_16E19ED3_05B1_F937_418F_5DC3324D7FF0",
  "this.overlay_5325ABDD_4EEE_379C_41CB_C299FDDD4EE0",
  "this.panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_tcap0"
 ],
 "hfovMin": "135%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E6ECE99_0571_F930_4187_CDDECD89D395",
   "yaw": 174.09,
   "backwardYaw": 81.93,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78",
   "yaw": -20.21,
   "backwardYaw": 115.98,
   "distance": 1
  }
 ],
 "hfov": 360,
 "mapLocations": [
  {
   "map": "this.map_7FDF4563_5A69_5A28_41CB_6937066B3391",
   "class": "PanoramaMapLocation",
   "angle": -83.57,
   "y": 740.67,
   "x": 404.96
  }
 ],
 "partial": false
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_88EA4876_867D_68B9_41DE_2FA73748D29E",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 96.23,
  "pitch": 0
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear",
    "yawDelta": 323,
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "yawSpeed": 7.96
   }
  ]
 },
 "id": "camera_8B8A97EA_867D_67A9_41D0_4AE8671782F7",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 19.51,
  "pitch": 0
 }
},
{
 "paddingBottom": 0,
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "MainViewer",
 "left": 0,
 "playbackBarRight": 0,
 "class": "ViewerArea",
 "toolTipFontWeight": "normal",
 "width": "100%",
 "progressBarBorderSize": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarProgressBorderRadius": 0,
 "shadow": false,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowVerticalLength": 23,
 "progressBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "transitionDuration": 500,
 "toolTipFontFamily": "Arial Black",
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "minHeight": 50,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "minWidth": 100,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipFontColor": "#606060",
 "height": "100%",
 "paddingRight": 0,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#000000",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "progressOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "progressBottom": 0,
 "toolTipShadowHorizontalLength": 23,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "firstTransitionDuration": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "toolTipPaddingRight": 6,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "toolTipBorderSize": 2,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "top": 0,
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "displayTooltipInTouchScreens": true,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipShadowBlurRadius": 28,
 "borderSize": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#000000",
 "progressBarBorderColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "transitionMode": "blending",
 "toolTipShadowSpread": 0,
 "progressBorderColor": "#000000",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "12px",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "data": {
  "name": "Main Viewer"
 },
 "toolTipShadowColor": "#333333",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "gap": 10,
 "children": [
  "this.Label_0A5C65D9_16A5_98B3_41B4_573FE3033A1F",
  "this.Label_0B130419_16A3_7FB3_41A4_E5F9FA0AC39B",
  "this.Container_4C4485F0_5A2A_DA27_41C7_F052846B4233"
 ],
 "id": "Container_0AEF1C12_16A3_8FB1_4188_D5C88CE581C3",
 "left": "5.73%",
 "width": 573,
 "class": "Container",
 "scrollBarMargin": 2,
 "shadow": false,
 "overflow": "visible",
 "backgroundOpacity": 0,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 116,
 "minHeight": 1,
 "top": "6.66%",
 "propagateClick": false,
 "borderSize": 0,
 "minWidth": 1,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 1,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "TITLE"
 },
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "gap": 10,
 "children": [
  "this.Label_4AD062F3_57CA_98EA_41D3_133750B0BF91",
  "this.Label_415E45CF_57C6_993A_41D5_BCB9500494C2",
  "this.IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA",
  "this.IconButton_600B7BDD_57CA_68DE_41D3_0FD9B1BB393D",
  "this.Label_57F953B6_74FA_0F6C_41D0_106BEBF633D1"
 ],
 "id": "Container_49D03164_57CA_79EE_41B1_5425A56CE8B0",
 "left": "0%",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "borderSize": 0,
 "minHeight": 1,
 "height": "17.511%",
 "propagateClick": false,
 "minWidth": 1,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "bottom": "0%",
 "data": {
  "name": "NEW MENU"
 },
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "toolTipPaddingBottom": 4,
 "paddingBottom": 0,
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "MapViewer",
 "playbackBarRight": 0,
 "class": "ViewerArea",
 "toolTipFontWeight": "normal",
 "right": "6%",
 "width": "31.554%",
 "progressBarBorderSize": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarProgressBorderRadius": 0,
 "shadow": false,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowVerticalLength": 23,
 "progressBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "transitionDuration": 500,
 "toolTipFontFamily": "Arial Black",
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "minWidth": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipFontColor": "#606060",
 "height": "34.588%",
 "paddingRight": 0,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#000000",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "progressOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "progressBottom": 2,
 "toolTipShadowHorizontalLength": 23,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "firstTransitionDuration": 0,
 "show": "this.setMediaBehaviour(this.playList_96FC06C8_867D_59E9_41CD_82CDB390E8C2, 0)",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "toolTipPaddingRight": 6,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "toolTipBorderSize": 2,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "top": "6.66%",
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "displayTooltipInTouchScreens": true,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipShadowBlurRadius": 28,
 "borderSize": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#000000",
 "progressBarBorderColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "transitionMode": "blending",
 "toolTipShadowSpread": 0,
 "progressBorderColor": "#000000",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "12px",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "data": {
  "name": "Floor Plan"
 },
 "toolTipShadowColor": "#333333",
 "toolTipTextShadowBlurRadius": 3,
 "visible": false,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "children": [
  "this.Container_42B6C7D2_5CC7_4312_4194_E38643787E94"
 ],
 "paddingLeft": 0,
 "id": "Container_42B697D2_5CC7_4312_41C3_D35F999D31FE",
 "left": "0%",
 "scrollBarMargin": 2,
 "class": "Container",
 "right": "0%",
 "gap": 10,
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.6,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "borderSize": 0,
 "top": "0%",
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "click": "this.setComponentVisibility(this.Container_42B697D2_5CC7_4312_41C3_D35F999D31FE, false, 0, null, null, false)",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "bottom": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "POINT LIST"
 },
 "visible": false,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "children": [
  "this.Container_4E6D4157_5A36_BA69_41C3_66AC7B50DE12",
  "this.Container_4E6C3158_5A36_BA67_41C9_74C5380CC87D"
 ],
 "paddingLeft": 0,
 "id": "Container_4E6C6158_5A36_BA67_41D5_8CC28887B5D9",
 "left": "0%",
 "scrollBarMargin": 2,
 "class": "Container",
 "right": "0%",
 "gap": 10,
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.6,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "borderSize": 0,
 "top": "0%",
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "click": "this.setComponentVisibility(this.Container_4E6C6158_5A36_BA67_41D5_8CC28887B5D9, false, 0, null, null, false)",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "bottom": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#04A3E1",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "ABOUT US"
 },
 "visible": false,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "paddingLeft": 0,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "scrollBarMargin": 2,
 "class": "Container",
 "right": "0%",
 "gap": 10,
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.6,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "borderSize": 0,
 "top": "0%",
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "bottom": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "--PANORAMA LIST"
 },
 "visible": false,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "gap": 10,
 "children": [
  "this.Image_9511127C_9B79_D2C1_41D8_D080B87BFD84",
  "this.Container_9A7696F9_9256_4198_41E2_40E7CF09A427"
 ],
 "id": "Container_32CC4EA6_16EF_8891_41B3_C36F5FCE49B7",
 "left": "0%",
 "scrollBarMargin": 2,
 "class": "Container",
 "right": "0%",
 "backgroundImageUrl": "skin/Container_32CC4EA6_16EF_8891_41B3_C36F5FCE49B7.png",
 "shadow": false,
 "overflow": "visible",
 "backgroundOpacity": 0.6,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "borderSize": 0,
 "height": "12.832%",
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "bottom": "0%",
 "visible": false,
 "data": {
  "name": "--- MENU"
 },
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "gap": 10,
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "width": 115.05,
 "class": "Container",
 "right": "0%",
 "scrollBarMargin": 2,
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 641,
 "minHeight": 1,
 "top": "0%",
 "propagateClick": false,
 "borderSize": 0,
 "minWidth": 1,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "-- SETTINGS"
 },
 "scrollBarVisible": "rollOver",
 "visible": false,
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "children": [
  "this.Container_04FF5C2C_1216_7593_41B2_1B5CFADF351D",
  "this.Container_04FF9C2D_1216_75ED_41A8_E3495D8F554E"
 ],
 "paddingLeft": 0,
 "id": "Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95",
 "left": "0%",
 "scrollBarMargin": 2,
 "class": "Container",
 "right": "0%",
 "gap": 10,
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.6,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "borderSize": 0,
 "top": "0%",
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95, false, 0, null, null, false)",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "bottom": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#04A3E1",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "--INFO"
 },
 "visible": false,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "children": [
  "this.Container_1813AA3E_1663_8BF1_41A2_CA5EE3718362",
  "this.Container_1812AA3F_1663_8BEF_41A4_02F566B1BC6D"
 ],
 "paddingLeft": 0,
 "id": "Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F",
 "left": "0%",
 "scrollBarMargin": 2,
 "class": "Container",
 "right": "0%",
 "gap": 10,
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.6,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "borderSize": 0,
 "top": "0%",
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F, false, 0, null, null, false)",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "bottom": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "--LOCATION"
 },
 "visible": false,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "paddingLeft": 0,
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "scrollBarMargin": 2,
 "class": "Container",
 "right": "0%",
 "gap": 10,
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.6,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "borderSize": 0,
 "top": "0%",
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "bottom": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "--PHOTOALBUM"
 },
 "visible": false,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "children": [
  "this.Container_0DEF7FEC_12FA_D293_4197_332CA20EDBCF",
  "this.Container_0DEC1FED_12FA_D26D_41AE_8CE7699C44D8"
 ],
 "paddingLeft": 0,
 "id": "Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08",
 "left": "0%",
 "scrollBarMargin": 2,
 "class": "Container",
 "right": "0%",
 "gap": 10,
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.6,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "borderSize": 0,
 "top": "0%",
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08, false, 0, null, null, false)",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "bottom": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "--CONTACT"
 },
 "visible": false,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "id": "IconButton_600B7BDD_57CA_68DE_41D3_0FD9B1BB393D",
 "width": 40,
 "class": "IconButton",
 "right": "10.38%",
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "transparencyActive": true,
 "height": 40,
 "minHeight": 0,
 "mode": "toggle",
 "top": "32.07%",
 "propagateClick": false,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_600B7BDD_57CA_68DE_41D3_0FD9B1BB393D_pressed.png",
 "minWidth": 0,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_600B7BDD_57CA_68DE_41D3_0FD9B1BB393D.png",
 "data": {
  "name": "Button8714"
 },
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "maxWidth": 58,
 "class": "IconButton",
 "maxHeight": 58,
 "width": 58,
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "transparencyActive": true,
 "height": 58,
 "minHeight": 1,
 "mode": "toggle",
 "propagateClick": false,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "minWidth": 1,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "data": {
  "name": "IconButton MUTE"
 },
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "maxWidth": 58,
 "class": "IconButton",
 "maxHeight": 58,
 "width": 58,
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "transparencyActive": true,
 "height": 58,
 "minHeight": 1,
 "mode": "toggle",
 "propagateClick": false,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "minWidth": 1,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -122.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -10.48,
   "hfov": 13.68
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA5BA37_5233_7A54_41D0_4F1AEE0E761D",
   "yaw": -122.36,
   "pitch": -10.48,
   "hfov": 13.68,
   "distance": 100
  }
 ],
 "id": "overlay_393C7500_2CA9_18BB_41C0_AC530D03CB9D",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065, this.camera_8943693B_867D_68AF_41D9_F0761FA45033); this.mainPlayList.set('selectedIndex', 32)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 2.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -3.67,
   "hfov": 13.89
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA53A37_5233_7A54_41D2_753B4FBA6DE8",
   "yaw": 2.03,
   "pitch": -3.67,
   "hfov": 13.89,
   "distance": 100
  }
 ],
 "id": "overlay_3B9236B9_2CA8_F9CD_41C5_7CC751A29806",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1528A598_0E47_2682_419F_D4D43FD887F8, this.camera_89539921_867D_6858_417F_0B58AA83C7F0); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 165.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -10.48,
   "hfov": 13.68
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB8FA35_5233_7A54_41CE_317CD0AAB290",
   "yaw": 165.92,
   "pitch": -10.48,
   "hfov": 13.68,
   "distance": 100
  }
 ],
 "id": "overlay_3E27D092_2CA9_19DF_41C0_0086BE9ED6D1",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE, this.camera_89E149C4_867D_6BD8_41C6_EEBF1027BB81); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -20.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -5.48,
   "hfov": 13.85
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB87A36_5233_7A54_41A9_82110CCC3AE9",
   "yaw": -20.21,
   "pitch": -5.48,
   "hfov": 13.85,
   "distance": 100
  }
 ],
 "id": "overlay_3F860738_2CA9_18CA_41A2_EC783FF21995",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_15CD94F3_0E47_6687_4178_848F8F9858B3, this.camera_89D0A9CF_867D_6BE8_41D0_EB11C2B874E7); this.mainPlayList.set('selectedIndex', 24); this.mainPlayList.set('selectedIndex', 31)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 20.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -3.67,
   "hfov": 13.89
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DBFAA32_5233_7A6C_41AA_2903D20CFE0B",
   "yaw": 20.19,
   "pitch": -3.67,
   "hfov": 13.89,
   "distance": 100
  }
 ],
 "id": "overlay_103D59E6_0E49_2E81_41A7_42A08C5C6941",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0, this.camera_897668EE_867D_69A8_41DF_F704106C3275); this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -160.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -5.03,
   "hfov": 13.86
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DBF0A32_5233_7A6C_41C4_E94FC35E3C4A",
   "yaw": -160.04,
   "pitch": -5.03,
   "hfov": 13.86,
   "distance": 100
  }
 ],
 "id": "overlay_16AB03E9_0E47_6282_41A4_132B755E166B",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59, this.camera_897818CD_867D_69EB_41D3_D33DD11CF14C); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -76.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -2.76,
   "hfov": 13.9
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DBEFA32_5233_7A6C_4186_3C6959C93209",
   "yaw": -76.05,
   "pitch": -2.76,
   "hfov": 13.9,
   "distance": 100
  }
 ],
 "id": "overlay_16D8FA55_0E59_2D83_4167_2B0C45306F08",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B, this.camera_89659908_867D_6868_41D3_1B5A4AA9713D); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_1135AE32_0E7E_E581_4165_7567158085FA_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -14.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -0.03,
   "hfov": 13.91
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA20A38_5233_7A5D_41CF_420D994DCE71",
   "yaw": -14.31,
   "pitch": -0.03,
   "hfov": 13.91,
   "distance": 100
  }
 ],
 "id": "overlay_35993620_2CDB_18FB_4193_6D05BB128941",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460, this.camera_89CFD9DB_867D_6BE8_41E0_AA91B8CC961F); this.mainPlayList.set('selectedIndex', 35)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 161.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -7.75,
   "hfov": 13.79
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA19A38_5233_7A5D_41D2_D0C1A42FE4F5",
   "yaw": 161.38,
   "pitch": -7.75,
   "hfov": 13.79,
   "distance": 100
  }
 ],
 "id": "overlay_36758ED7_2CDB_0945_41AC_8C368AA7A89B",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56, this.camera_89BFE9E7_867D_6BD8_41D6_5FF70D6A57E0); this.mainPlayList.set('selectedIndex', 37)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 175.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -8.66,
   "hfov": 13.76
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA10A38_5233_7A5D_41A9_8B06633E4FFE",
   "yaw": 175.38,
   "pitch": -8.66,
   "hfov": 13.76,
   "distance": 100
  }
 ],
 "id": "overlay_32AA0C09_2CD9_08CD_41C4_D7463562862A",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_15CDCACE_0E46_E281_419B_D1DF72349238, this.camera_89AE59F8_867D_6BA8_418B_63AAA360DD74); this.mainPlayList.set('selectedIndex', 40)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_15C262D9_0E49_6283_4181_A0951E3715F8_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 149.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -10.02,
   "hfov": 13.7
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA4BA37_5233_7A53_41D1_929B3E92CECE",
   "yaw": 149.12,
   "pitch": -10.02,
   "hfov": 13.7,
   "distance": 100
  }
 ],
 "id": "overlay_3A4DF805_2CD7_08C5_4151_97FC90AF8AFD",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773, this.camera_894DDC8D_867D_686B_41BE_2C2EE9D15E4A); this.mainPlayList.set('selectedIndex', 33)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -20.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -3.21,
   "hfov": 13.89
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA3CA37_5233_7A53_41B0_942A7DA2B9EE",
   "yaw": -20.67,
   "pitch": -3.21,
   "hfov": 13.89,
   "distance": 100
  }
 ],
 "id": "overlay_3B58CAD9_2CD9_094A_41C4_29FBCC88963B",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460, this.camera_893D1C97_867D_6867_41C1_F77317402ACE); this.mainPlayList.set('selectedIndex', 35)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_1528A598_0E47_2682_419F_D4D43FD887F8_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -173.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -8.66,
   "hfov": 13.76
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D4E4A2B_5233_7A73_41D3_DA04F44B4880",
   "yaw": -173.66,
   "pitch": -8.66,
   "hfov": 13.76,
   "distance": 100
  }
 ],
 "id": "overlay_11C08CE0_0591_3910_4190_C1EC2BDFF437",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093, this.camera_88A638AB_867D_69AF_41C4_B1016C528220); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 7.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -4.12,
   "hfov": 13.88
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D4E0A2B_5233_7A73_41C6_C151A90E9083",
   "yaw": 7.03,
   "pitch": -4.12,
   "hfov": 13.88,
   "distance": 100
  }
 ],
 "id": "overlay_11E5E997_0591_1B3F_4185_93DE1F284145",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E4C7505_0571_2B10_418D_58B200FF616A, this.camera_88B7A8A0_867D_6859_41D5_C36D81C3D00D); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 153.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -1.85,
   "hfov": 13.91
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DBC0A33_5233_7A6C_41B0_BD16518071B8",
   "yaw": 153.66,
   "pitch": -1.85,
   "hfov": 13.91,
   "distance": 100
  }
 ],
 "id": "overlay_16685F2E_0E49_239E_41A5_98EA125C842A",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1539EF00_0E49_6381_41A6_6AD6645EA450, this.camera_88C7B896_867D_6879_41B9_60704CF78992); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 152.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": 31.74,
   "hfov": 11.83
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DBBFA33_5233_7A6C_41CB_A6D1A24A9553",
   "yaw": 152.3,
   "pitch": 31.74,
   "hfov": 11.83,
   "distance": 100
  }
 ],
 "id": "overlay_1471DD8A_0E49_E681_4185_E855F12B4FB0",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 49.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -4.57,
   "hfov": 13.87
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DBB6A34_5233_7A54_41AE_AD606D70D275",
   "yaw": 49.24,
   "pitch": -4.57,
   "hfov": 13.87,
   "distance": 100
  }
 ],
 "id": "overlay_1426A35E_0E4A_E381_418D_83F6A0421AF8",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0, this.camera_88D90881_867D_685B_41BE_0377312C40AD); this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -133.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -4.57,
   "hfov": 13.87
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DBAFA34_5233_7A54_41B9_D2F387340541",
   "yaw": -133.71,
   "pitch": -4.57,
   "hfov": 13.87,
   "distance": 100
  }
 ],
 "id": "overlay_3F89F87E_2CAB_0947_41C3_6ACD1824AA56",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1528DFC3_0E47_6287_4168_2A5FED85E797, this.camera_88C9C88B_867D_686F_41C8_266CC24B2BF1); this.mainPlayList.set('selectedIndex', 30)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 153.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_1_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 9.49,
   "hfov": 10.15
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8B42172F_867D_58A8_419B_8157673BE58C",
   "yaw": 153.51,
   "pitch": 9.49,
   "hfov": 10.15,
   "distance": 100
  }
 ],
 "id": "overlay_54FDDC55_4D3A_10EC_41D2_C28E88FA8326",
 "data": {
  "label": "Info Red 03"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showWindow(this.window_548BC044_4D26_70EC_41D0_F9B6D8F93E95, null, false)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "paddingLeft": 0,
 "id": "IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA",
 "width": 49,
 "class": "IconButton",
 "right": "5%",
 "maxHeight": 37,
 "maxWidth": 49,
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA_rollover.png",
 "borderRadius": 0,
 "transparencyActive": true,
 "top": "31%",
 "minHeight": 1,
 "mode": "push",
 "height": 37,
 "propagateClick": false,
 "borderSize": 0,
 "minWidth": 1,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA.png",
 "data": {
  "name": "IconButton VR"
 },
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "visible": false,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "maxWidth": 58,
 "class": "IconButton",
 "maxHeight": 58,
 "width": 58,
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "borderRadius": 0,
 "transparencyActive": true,
 "height": 58,
 "minHeight": 1,
 "mode": "push",
 "propagateClick": false,
 "borderSize": 0,
 "minWidth": 1,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "data": {
  "name": "IconButton VR"
 },
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "maxWidth": 58,
 "class": "IconButton",
 "maxHeight": 58,
 "width": 58,
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "transparencyActive": true,
 "height": 58,
 "minHeight": 1,
 "mode": "toggle",
 "propagateClick": false,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "minWidth": 1,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "data": {
  "name": "IconButton GYRO"
 },
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "maxWidth": 58,
 "class": "IconButton",
 "maxHeight": 58,
 "width": 58,
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "transparencyActive": true,
 "height": 58,
 "minHeight": 1,
 "mode": "toggle",
 "propagateClick": false,
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "minWidth": 1,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "data": {
  "name": "IconButton HS "
 },
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -151.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -9.11,
   "hfov": 13.74
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB4EA30_5233_7A6C_41D4_3B47D51F4C27",
   "yaw": -151.41,
   "pitch": -9.11,
   "hfov": 13.74,
   "distance": 100
  }
 ],
 "id": "overlay_130BC8BA_0E5E_EE81_4185_00F535272EA5",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D, this.camera_892DBCAE_867D_69A9_41D3_B070F98A4538); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "id": "htmlText_53D0480D_4EEE_707C_41CF_F648A7CE9FFB",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 0,
 "height": "100%",
 "propagateClick": false,
 "minWidth": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Poppins Light';\">Terdapat gazebo yang disewakan. Selain itu juga terdapat warung yang menjual berbagai makanan ringan dan pulsa.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText24625"
 },
 "paddingLeft": 10,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 10,
 "paddingTop": 10
},
{
 "id": "htmlText_514D27ED_4D1A_7FBC_41C0_67E934B62983",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 0,
 "height": "100%",
 "propagateClick": false,
 "minWidth": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:13px;font-family:'Poppins Light';\">Tersedia 5 gazebo kecil dari harga Rp. 50.000, </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:13px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:13px;font-family:'Poppins Light';\">2 gazebo sedang seharga Rp. 75.000, dan </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:13px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:13px;font-family:'Poppins Light';\">1 gazebo besar seharga Rp. 100.000.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:13px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:13px;font-family:'Poppins Light';\">Selain itu, juga menjual berbagai makanan, seperti: otak-otak, guras, ketupat, makanan khas melayu, dan berbagai snack. </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:13px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:13px;font-family:'Poppins Light';\">Dimulai dari Rp. 3.000 hingga Rp. 10.000.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText18121"
 },
 "paddingLeft": 10,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 10,
 "paddingTop": 10
},
{
 "id": "htmlText_55974FB3_4EEA_0FA4_41C5_1A942E4A1FF5",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 0,
 "height": "100%",
 "propagateClick": false,
 "minWidth": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Poppins Light';\">Terdapat 3 gazebo besar dan luas, seharga Rp. 100.000. Bisa dipakai sepuasnya.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText23357"
 },
 "paddingLeft": 10,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 10,
 "paddingTop": 10
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 34.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -2.3,
   "hfov": 13.9
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB45A2F_5233_7A74_41C6_D15806745D7A",
   "yaw": 34.26,
   "pitch": -2.3,
   "hfov": 13.9,
   "distance": 100
  }
 ],
 "id": "overlay_1C7375F7_0E59_268F_4180_AD3BECF39FB9",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_19C52053_0EFF_5D87_4196_595FEE001077, this.camera_9639AA4C_867D_68E9_41E0_88C909D5CC57); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -139.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -7.75,
   "hfov": 13.79
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB59A2F_5233_7A74_41A0_8552BBA5FAAE",
   "yaw": -139.61,
   "pitch": -7.75,
   "hfov": 13.79,
   "distance": 100
  }
 ],
 "id": "overlay_126B9863_0E59_ED86_41A0_FD14283EFDA3",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_19C50517_0EFF_278F_418F_A1A6D818ED77, this.camera_965B7A32_867D_68B9_41DD_5B0D4AB8E935); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -67.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -0.49,
   "hfov": 13.91
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB50A2F_5233_7A74_41B3_54A967BB4D26",
   "yaw": -67.43,
   "pitch": -0.49,
   "hfov": 13.91,
   "distance": 100
  }
 ],
 "id": "overlay_1116E0C8_0E49_3E81_419E_1448A09BC62C",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_19C5D87C_0EFF_6D81_4192_778A4793128C, this.camera_964B2A3D_867D_68AB_41D5_879A21E38E8A); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 76.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -5.03,
   "hfov": 13.86
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB73A2E_5233_7A74_41C3_E2E24D628524",
   "yaw": 76.94,
   "pitch": -5.03,
   "hfov": 13.86,
   "distance": 100
  }
 ],
 "id": "overlay_1AC3132A_0ACF_2387_4190_E5EBC30DF61C",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_08B36D2B_05B9_2786_417C_E427144A44E5, this.camera_8843282C_867D_68A9_41CC_00A4C19E5A64); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -105.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -7.3,
   "hfov": 13.8
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB68A2E_5233_7A74_41CA_AE9BE2701EA1",
   "yaw": -105.56,
   "pitch": -7.3,
   "hfov": 13.8,
   "distance": 100
  }
 ],
 "id": "overlay_1321742B_0E49_2587_419D_067369BB4B5A",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_18A51027_0EF9_3D8F_4187_38630AC4D588, this.camera_88323837_867D_68A7_41D7_D392821B1B50); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -6.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -6.39,
   "hfov": 13.83
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA90A3C_5233_7A55_41BD_3D9476718ED0",
   "yaw": -6.14,
   "pitch": -6.39,
   "hfov": 13.83,
   "distance": 100
  }
 ],
 "id": "overlay_0F1E5E2E_2CEF_08DF_41A1_B2EDA11B82A1",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE, this.camera_88782B87_867D_6858_41B5_E46A392333FB); this.mainPlayList.set('selectedIndex', 43)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 152.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": 31.29,
   "hfov": 11.89
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DBA6A35_5233_7A54_41D3_DE7D9D598818",
   "yaw": 152.3,
   "pitch": 31.29,
   "hfov": 11.89,
   "distance": 100
  }
 ],
 "id": "overlay_3CCB6C65_2CBB_0945_419B_4F68D185ABD8",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 29)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -6.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -18.65,
   "hfov": 13.18
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB9FA35_5233_7A54_41A9_687253C6E01E",
   "yaw": -6.14,
   "pitch": -18.65,
   "hfov": 13.18,
   "distance": 100
  }
 ],
 "id": "overlay_3DBC849E_2CB9_39C7_4187_DD4C2088B656",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1539EF00_0E49_6381_41A6_6AD6645EA450, this.camera_8911F990_867D_6878_41E0_51D717C92DAD); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -3.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -2.76,
   "hfov": 13.9
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB04A31_5233_7A6C_41C9_04FD228FF4F8",
   "yaw": -3.42,
   "pitch": -2.76,
   "hfov": 13.9,
   "distance": 100
  }
 ],
 "id": "overlay_1ECF1772_0EC7_2381_41A6_3F991593EF29",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1135AE32_0E7E_E581_4165_7567158085FA, this.camera_8B8C8B7B_867D_68A8_41E0_B04CE4FC1BBA); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -174.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -7.3,
   "hfov": 13.8
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB01A31_5233_7A6C_41D0_8100C59E8BF1",
   "yaw": -174.13,
   "pitch": -7.3,
   "hfov": 13.8,
   "distance": 100
  }
 ],
 "id": "overlay_1D648FB0_0EC7_6281_41A4_E786B70DE671",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4, this.camera_8B927B6F_867D_68A8_41C3_C13E4877BF88); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "id": "htmlText_5069BA65_4EEE_70AC_41D0_36DEAE27F9CF",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 0,
 "height": "100%",
 "propagateClick": false,
 "minWidth": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vw;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:0.73vw;font-family:'Poppins Light';\">Terdapat gazebo yang lebih luas dari yang lain dan terdapat pohon kelapa yang unik dimana tumbuh miring. Menyediakan fasilitas toilet juga serta beberapa jajanan lokal sepert seblak di ruko sampingnya.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText25908"
 },
 "paddingLeft": 10,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 10,
 "paddingTop": 10
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 156.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -8.66,
   "hfov": 13.76
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DBE7A32_5233_7A6C_41CA_4EA51A6872A6",
   "yaw": 156.38,
   "pitch": -8.66,
   "hfov": 13.76,
   "distance": 100
  }
 ],
 "id": "overlay_169C1ABE_0E47_6281_4192_B01AE8A3311F",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1135AE32_0E7E_E581_4165_7567158085FA, this.camera_88CC0C22_867D_6859_41D0_C716CB596C66); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -30.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -3.67,
   "hfov": 13.89
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DBDDA33_5233_7A6C_4198_095382EC1463",
   "yaw": -30.2,
   "pitch": -3.67,
   "hfov": 13.89,
   "distance": 100
  }
 ],
 "id": "overlay_14A8007E_0E4F_DD81_417C_4174B4BF5981",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE, this.camera_88DD6C15_867D_687B_41DE_C60666841EED); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 86.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -8.21,
   "hfov": 13.77
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D4E7A2A_5233_7A7D_41C1_4A1F1501A1A8",
   "yaw": 86.47,
   "pitch": -8.21,
   "hfov": 13.77,
   "distance": 100
  }
 ],
 "id": "overlay_16757ECB_0597_1910_4189_0DB0F824595B",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E6ECE99_0571_F930_4187_CDDECD89D395, this.camera_8921B973_867D_68B8_41D6_E0C8B277F7C4); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -75.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -6.84,
   "hfov": 13.82
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D4DCA2A_5233_7A7D_41D0_A674C2DD9FAA",
   "yaw": -75.14,
   "pitch": -6.84,
   "hfov": 13.82,
   "distance": 100
  }
 ],
 "id": "overlay_115F7828_0597_1911_4182_46848936DE88",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E42CECD_0571_1913_4164_CCF35AE78A87, this.camera_89326956_867D_68F8_41D1_543B0AE18829); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -179.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.08,
   "hfov": 10.29
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_96D916D8_867D_59E9_41D7_7D5B8B245ED2",
   "yaw": -179.19,
   "pitch": -1.08,
   "hfov": 10.29,
   "distance": 100
  }
 ],
 "id": "overlay_559632A4_4EEA_71AC_41CF_CA64F2FFF7CB",
 "data": {
  "label": "Info Red 03"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showWindow(this.window_55913FB3_4EEA_0FA4_4191_6F6FBE11964E, null, false)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_0E4C7505_0571_2B10_418D_58B200FF616A_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 84.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -5.48,
   "hfov": 13.85
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB25A30_5233_7A6C_41A2_95A9EBCAB9C4",
   "yaw": 84.2,
   "pitch": -5.48,
   "hfov": 13.85,
   "distance": 100
  }
 ],
 "id": "overlay_1FFD99E6_0EC9_2E81_418B_F61C80A43F04",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59, this.camera_88204841_867D_68DB_41C6_6074C26D08F7); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -96.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -3.67,
   "hfov": 13.89
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB1CA31_5233_7A6C_41AD_7095A64CE9B5",
   "yaw": -96.93,
   "pitch": -3.67,
   "hfov": 13.89,
   "distance": 100
  }
 ],
 "id": "overlay_1F085846_0ECE_ED81_4166_4B77CE9B75CC",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8, this.camera_880D0857_867D_68E7_41DF_0387563E5966); this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -7.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -6.39,
   "hfov": 13.83
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB19A31_5233_7A6C_419D_D82C2B1DE5EB",
   "yaw": -7.96,
   "pitch": -6.39,
   "hfov": 13.83,
   "distance": 100
  }
 ],
 "id": "overlay_1185CBE9_0E4B_6283_4197_F3BC9122E385",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_19C5D87C_0EFF_6D81_4192_778A4793128C, this.camera_881F384B_867D_68EF_41D5_9C069C10A627); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -7.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.34,
   "hfov": 10.27
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8B40272C_867D_58A8_41C3_0CEA2DA4F994",
   "yaw": -7.24,
   "pitch": 4.34,
   "hfov": 10.27,
   "distance": 100
  }
 ],
 "id": "overlay_56BB71B1_4D1E_13A4_41A1_AF15A9B00A35",
 "data": {
  "label": "Info Red 03"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showWindow(this.window_5676D46A_4D1E_30A7_41B4_E1892FAEB405, null, false)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 6.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -6.84,
   "hfov": 13.82
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA6BA36_5233_7A54_41CF_267FA6086E0C",
   "yaw": 6.12,
   "pitch": -6.84,
   "hfov": 13.82,
   "distance": 100
  }
 ],
 "id": "overlay_398522EF_2CA9_1945_41C2_3051D4A3C3CD",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773, this.camera_9619DA6A_867D_68A8_41BC_357C3375F3E2); this.mainPlayList.set('selectedIndex', 33)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 168.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -19.1,
   "hfov": 13.15
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA63A36_5233_7A54_41B2_8AA05704AEC8",
   "yaw": 168.19,
   "pitch": -19.1,
   "hfov": 13.15,
   "distance": 100
  }
 ],
 "id": "overlay_3972F4DA_2CAB_194F_41B8_2A5FAE729687",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_15CD94F3_0E47_6687_4178_848F8F9858B3, this.camera_96082A7B_867D_68AF_41CA_879CC2442ED3); this.mainPlayList.set('selectedIndex', 31)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 108.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -8.21,
   "hfov": 13.77
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DAA6A3C_5233_7A55_41CB_9E111B06EDAD",
   "yaw": 108.26,
   "pitch": -8.21,
   "hfov": 13.77,
   "distance": 100
  }
 ],
 "id": "overlay_0E9F8976_2CE9_0B47_417D_D171A518DD55",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134, this.camera_8BCC67B2_867D_67B9_41CA_AE21C1E23A4F); this.mainPlayList.set('selectedIndex', 42)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -57.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -5.48,
   "hfov": 13.85
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA9EA3C_5233_7A55_41D0_0547247553FF",
   "yaw": -57.44,
   "pitch": -5.48,
   "hfov": 13.85,
   "distance": 100
  }
 ],
 "id": "overlay_0F731134_2CE8_F8DB_418A_452F1474A018",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_15C2515F_0E49_3FBF_4197_AB506B14A635, this.camera_8BC7C7C0_867D_67D9_41B7_2F31E994DF67); this.mainPlayList.set('selectedIndex', 44)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 81.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -4.12,
   "hfov": 13.88
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D4ECA2A_5233_7A7D_41B4_138040D2E944",
   "yaw": 81.93,
   "pitch": -4.12,
   "hfov": 13.88,
   "distance": 100
  }
 ],
 "id": "overlay_1692E6D0_05B2_E931_4195_8B8420C330E8",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85, this.camera_966C8A28_867D_68A9_419A_9576E8BFCDBE); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -78.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -6.39,
   "hfov": 13.83
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D4E8A2A_5233_7A7D_41C6_F9C1DD9F0F25",
   "yaw": -78.32,
   "pitch": -6.39,
   "hfov": 13.83,
   "distance": 100
  }
 ],
 "id": "overlay_164A62AB_0591_2917_4192_025199572618",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E4C7505_0571_2B10_418D_58B200FF616A, this.camera_967CAA1A_867D_6869_41DF_252A82592DAD); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 152.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 18,
      "height": 16
     }
    ]
   },
   "pitch": 57.02,
   "hfov": 8.52
  }
 ],
 "useHandCursor": true,
 "enabled": false,
 "items": [
  {
   "yaw": 152.55,
   "hfov": 8.52,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 264,
      "height": 230
     }
    ]
   },
   "pitch": 57.02
  }
 ],
 "id": "overlay_19BEA703_0ACB_2387_4169_096E9B51A98A",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE, this.camera_8BD4BB15_867D_6878_41D1_DEC5D6823139); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 32.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -4.12,
   "hfov": 13.88
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB7AA2E_5233_7A74_41CC_FD82BDE2C07E",
   "yaw": 32.45,
   "pitch": -4.12,
   "hfov": 13.88,
   "distance": 100
  }
 ],
 "id": "overlay_19A8E826_0ACB_2D81_4190_E17CBCD36321",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2, this.camera_8BDEEB09_867D_6868_41C3_1A080C121185); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 157.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": 56.16,
   "hfov": 13.76
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8B4E0729_867D_58A8_41DD_DCD3B688575B",
   "yaw": 157.14,
   "pitch": 56.16,
   "hfov": 13.76,
   "distance": 100
  }
 ],
 "id": "overlay_47CD8951_524C_E62C_41AD_61B2FEE4099F",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE, this.camera_8BC9EB20_867D_6858_416A_B40AD162A1B8); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_08B36D2B_05B9_2786_417C_E427144A44E5_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -96.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -3.67,
   "hfov": 13.89
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB60A2E_5233_7A74_41C0_6A033C7AFDFC",
   "yaw": -96.93,
   "pitch": -3.67,
   "hfov": 13.89,
   "distance": 100
  }
 ],
 "id": "overlay_1D5BF920_0E47_2F81_4179_C22F3BB82538",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2, this.camera_88B98C2D_867D_68AB_41C3_19FF668D634D); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 87.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -5.94,
   "hfov": 13.84
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB5DA2E_5233_7A74_41C3_6B9A915BB9A1",
   "yaw": 87.38,
   "pitch": -5.94,
   "hfov": 13.84,
   "distance": 100
  }
 ],
 "id": "overlay_1311FBFA_0E47_2281_4193_0B99BE991C67",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_19C52053_0EFF_5D87_4196_595FEE001077, this.camera_88A89C38_867D_68A9_41DD_C9F1AD951D86); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 66.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -6.39,
   "hfov": 13.83
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D449A27_5233_7A73_41D1_2EBD4E61E8E9",
   "yaw": 66.95,
   "pitch": -6.39,
   "hfov": 13.83,
   "distance": 100
  }
 ],
 "id": "overlay_147BDA8B_0591_3910_4192_EDD447B28865",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E4E731A_0571_6F31_4162_D4BA007223D8, this.camera_89712C6F_867D_68A7_41B2_EF2FC0D7CB9F); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -120.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -9.11,
   "hfov": 13.74
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D447A27_5233_7A73_41D4_29F570B377F1",
   "yaw": -120.99,
   "pitch": -9.11,
   "hfov": 13.74,
   "distance": 100
  }
 ],
 "id": "overlay_17DDBAD2_0597_1930_416B_2E3E181BD664",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E6A508E_0571_E910_4182_3FA194973CF0, this.camera_895E5C83_867D_685F_41DC_B7AA5400DBFC); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 115.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -10.48,
   "hfov": 13.68
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D443A27_5233_7A73_41C8_061F6466B11E",
   "yaw": 115.98,
   "pitch": -10.48,
   "hfov": 13.68,
   "distance": 100
  }
 ],
 "id": "overlay_17E4DC66_058F_1911_4193_BD1B25E85E89",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85, this.camera_89608C79_867D_68AB_41BC_C33697C09269); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 85.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.9,
   "hfov": 10.28
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_96E3F6D3_867D_59FF_41A2_3EF09E07FC06",
   "yaw": 85.28,
   "pitch": 2.9,
   "hfov": 10.28,
   "distance": 100
  }
 ],
 "id": "overlay_5159EA8F_4EEE_307C_41C1_1A3AF9C9B8D4",
 "data": {
  "label": "Info Red 03"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showWindow(this.window_506F7A65_4EEE_70AC_41D0_B6248AF1A574, null, false)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 106.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -4.57,
   "hfov": 13.87
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA20A38_5233_7A5D_41C6_EDC0C52530B3",
   "yaw": 106.9,
   "pitch": -4.57,
   "hfov": 13.87,
   "distance": 100
  }
 ],
 "id": "overlay_36FB9F0C_2CD9_08CB_41B0_9ABFB17BC83C",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_15C262D9_0E49_6283_4181_A0951E3715F8, this.camera_8BB197CB_867D_67EF_41C5_D9611EDFC394); this.mainPlayList.set('selectedIndex', 36)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 81.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -2.3,
   "hfov": 13.9
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA18A39_5233_7A5F_41CA_A1EF6E7FE476",
   "yaw": 81.02,
   "pitch": -2.3,
   "hfov": 13.9,
   "distance": 100
  }
 ],
 "id": "overlay_379995A7_2CDF_1BC5_41B5_9BEB9E0B6D77",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 40)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -76.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -10.48,
   "hfov": 13.68
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA10A39_5233_7A5F_41A7_A8573BEFC2E5",
   "yaw": -76.96,
   "pitch": -10.48,
   "hfov": 13.68,
   "distance": 100
  }
 ],
 "id": "overlay_371F176C_2CDF_074B_41B6_2A4C4680A4BD",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_15C25C28_0E49_6581_418D_F485BF9783EC, this.camera_8BAF67D5_867D_67FB_41BD_811E253C7065); this.mainPlayList.set('selectedIndex', 38)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -129.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -5.48,
   "hfov": 13.85
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA08A39_5233_7A5F_4190_052F1DE88C6E",
   "yaw": -129.17,
   "pitch": -5.48,
   "hfov": 13.85,
   "distance": 100
  }
 ],
 "id": "overlay_3676585F_2CD9_0945_41C5_0736F101DD65",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813, this.camera_8B9D67E0_867D_67D9_41CF_5F3FB22FAFB0); this.mainPlayList.set('selectedIndex', 39)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 10.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -6.84,
   "hfov": 13.82
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA7AA36_5233_7A54_41C7_4D46FF1E7377",
   "yaw": 10.2,
   "pitch": -6.84,
   "hfov": 13.82,
   "distance": 100
  }
 ],
 "id": "overlay_3F09F1DA_2CAF_FB4F_41B3_2BCE8F5B1539",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065, this.camera_88957C55_867D_68FB_41D6_D21ABEE602B9); this.mainPlayList.set('selectedIndex', 32)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -155.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -11.38,
   "hfov": 13.64
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA71A36_5233_7A54_41D1_E169EFEB1B45",
   "yaw": -155.95,
   "pitch": -11.38,
   "hfov": 13.64,
   "distance": 100
  }
 ],
 "id": "overlay_384B9251_2CAF_395D_41C4_11925B9939FD",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1528DFC3_0E47_6287_4168_2A5FED85E797, this.camera_88A7FC45_867D_68DB_41D2_B4DD31B6D3FD); this.mainPlayList.set('selectedIndex', 30)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "id": "htmlText_548D3044_4D26_70EC_41C4_A71B0DF7472D",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 0,
 "height": "100%",
 "propagateClick": false,
 "minWidth": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Poppins Light';\">Homestay yang berbentuk kapal, terdapat </SPAN><SPAN STYLE=\"font-size:14px;font-family:'Poppins Light';\"><B>1 kamar</B></SPAN><SPAN STYLE=\"font-size:14px;font-family:'Poppins Light';\">. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Poppins Light';\">Tersedia </SPAN><SPAN STYLE=\"font-size:14px;font-family:'Poppins Light';\"><B>dapur</B></SPAN><SPAN STYLE=\"font-size:14px;font-family:'Poppins Light';\"> dan</SPAN><SPAN STYLE=\"font-size:14px;font-family:'Poppins Light';\"><B> toilet</B></SPAN><SPAN STYLE=\"font-size:14px;font-family:'Poppins Light';\">.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:14px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Poppins Light';\">Harga: Rp.350.000 (extra bed charge Rp: 100.000)</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:12px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:12px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "data": {
  "name": "HTMLText16632"
 },
 "paddingLeft": 10,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 10,
 "paddingTop": 10
},
{
 "id": "htmlText_5671146A_4D1E_30A7_41D0_BDB43515E01D",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 0,
 "height": "100%",
 "propagateClick": false,
 "minWidth": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Poppins Light';\">Tempat parkir yang luas dengan harga Rp. 5.000/motor dan Rp. 10.000/mobil</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText19462"
 },
 "paddingLeft": 10,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 10,
 "paddingTop": 10
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -169.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -6.39,
   "hfov": 13.83
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D408A29_5233_7A7F_41AE_788321B649AB",
   "yaw": -169.12,
   "pitch": -6.39,
   "hfov": 13.83,
   "distance": 100
  }
 ],
 "id": "overlay_17056276_0593_29F1_4193_0B5D87E38871",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78, this.camera_88840C64_867D_68D9_4194_913C7FB7E436); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 14.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -2.3,
   "hfov": 13.9
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D4BFA2B_5233_7A73_41D3_FCCED5617D03",
   "yaw": 14.29,
   "pitch": -2.3,
   "hfov": 13.9,
   "distance": 100
  }
 ],
 "id": "overlay_07852E10_0AD9_2581_41A0_89B229B0D044",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093, this.camera_8BD2B7A4_867D_5858_41E0_47625952AA7C); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -164.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -7.3,
   "hfov": 13.8
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D4B4A2B_5233_7A73_41CB_7C0E5A69486A",
   "yaw": -164.58,
   "pitch": -7.3,
   "hfov": 13.8,
   "distance": 100
  }
 ],
 "id": "overlay_188D9AFE_0ADB_2281_416C_461C58184AB9",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_09916AFC_05BF_E281_4186_720CA74703AB, this.camera_8BD81797_867D_5878_41C1_31F141DD4CA9); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 170.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -13.49,
   "hfov": 11.33
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D456A27_5233_7A73_41A8_52277CA29202",
   "yaw": 170.84,
   "pitch": -13.49,
   "hfov": 11.33,
   "distance": 100
  }
 ],
 "id": "overlay_0BA2E81E_0571_1930_416F_B1027F451770",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78, this.camera_9629FA58_867D_68E9_41DB_CA21934A1B51); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -137.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -8.21,
   "hfov": 13.77
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D4C0A2B_5233_7A73_41D2_21F8EE4ACAD1",
   "yaw": -137.79,
   "pitch": -8.21,
   "hfov": 13.77,
   "distance": 100
  }
 ],
 "id": "overlay_1D3C76D6_0591_2931_4190_FED2103EE451",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093, this.camera_889678B5_867D_69BB_41D5_E67016172A99); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 133.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -5.48,
   "hfov": 13.85
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D496A2D_5233_7A74_41CD_81E131B35569",
   "yaw": 133.23,
   "pitch": -5.48,
   "hfov": 13.85,
   "distance": 100
  }
 ],
 "id": "overlay_1A5A7940_0AC9_6F81_4180_67B9CD4E925C",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_09916AFC_05BF_E281_4186_720CA74703AB, this.camera_88FC3869_867D_68AB_4173_48E1A78A3E5E); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -52.9,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -0.94,
   "hfov": 13.91
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D493A2D_5233_7A74_41C3_DD3F254645F5",
   "yaw": -52.9,
   "pitch": -0.94,
   "hfov": 13.91,
   "distance": 100
  }
 ],
 "id": "overlay_1F63362B_0EC9_2587_4188_CECF50FEB255",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8, this.camera_88EA4876_867D_68B9_41DE_2FA73748D29E); this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_09917766_05BF_2381_4162_44384798B870_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 174.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -8.66,
   "hfov": 13.76
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D4D8A2B_5233_7A73_41C2_74D4846817F5",
   "yaw": 174.54,
   "pitch": -8.66,
   "hfov": 13.76,
   "distance": 100
  }
 ],
 "id": "overlay_1132D0A6_059E_E910_4195_9C5DA97586E8",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E42CECD_0571_1913_4164_CCF35AE78A87, this.camera_8BBA1B40_867D_68D8_41C3_9CF56AFEAF21); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -12.29,
   "hfov": 13.6
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D4D4A2B_5233_7A73_41C6_DE204E547788",
   "yaw": -90.58,
   "pitch": -12.29,
   "hfov": 13.6,
   "distance": 100
  }
 ],
 "id": "overlay_102A1620_0591_2911_4168_ADFC815681B8",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA, this.camera_8BB47B4D_867D_68E8_41D1_F19338CF4443); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -1.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -3.21,
   "hfov": 13.89
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D4D2A2B_5233_7A73_41C2_A151FC1F3489",
   "yaw": -1.15,
   "pitch": -3.21,
   "hfov": 13.89,
   "distance": 100
  }
 ],
 "id": "overlay_0781A725_0ADB_2383_4160_EDD05B1522BD",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544, this.camera_8BC22B33_867D_68B8_41DE_58E47944DF0F); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -89.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.36,
   "hfov": 10.3
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_96DB16D9_867D_59EB_41D0_06277297C024",
   "yaw": -89.81,
   "pitch": 0.36,
   "hfov": 10.3,
   "distance": 100
  }
 ],
 "id": "overlay_557AEF6E_4EE6_10BC_41C4_5C2678FAFE4B",
 "data": {
  "label": "Info Red 03"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showWindow(this.window_5284AC27_4EE6_30AC_41A7_0AC7C6061A3E, null, false)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "id": "htmlText_52866C27_4EE6_30AC_41C5_08E4D3AC517E",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 0,
 "height": "100%",
 "propagateClick": false,
 "minWidth": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Poppins Light';\">Terdapat 3 gazebo, menjual berbagai makanan ringan. Tersedia toilet umum, Rp. 5.000 sekali masuk.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText22088"
 },
 "paddingLeft": 10,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 10,
 "paddingTop": 10
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 47.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -4.12,
   "hfov": 13.88
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA37A37_5233_7A53_41CC_AC4CDE692EF5",
   "yaw": 47.43,
   "pitch": -4.12,
   "hfov": 13.88,
   "distance": 100
  }
 ],
 "id": "overlay_3B6686D4_2CD9_395B_41B9_265B977A9197",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1528A598_0E47_2682_419F_D4D43FD887F8, this.camera_88268BDD_867D_6FE8_41BE_04D177024D39); this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 148.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -16.38,
   "hfov": 13.35
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA2EA37_5233_7A53_41C2_40CFAE9E0941",
   "yaw": 148.66,
   "pitch": -16.38,
   "hfov": 13.35,
   "distance": 100
  }
 ],
 "id": "overlay_34856B30_2CD9_08DB_41A2_663A78C4331D",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_15C262D9_0E49_6283_4181_A0951E3715F8, this.camera_88143BE7_867D_6FD8_41D7_577645715017); this.mainPlayList.set('selectedIndex', 36)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 38.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -10.48,
   "hfov": 13.68
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DACAA3B_5233_7A53_4178_9627E457BF88",
   "yaw": 38.35,
   "pitch": -10.48,
   "hfov": 13.68,
   "distance": 100
  }
 ],
 "id": "overlay_3350A018_2CE9_18CB_41AC_91FFEC4E548D",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134, this.camera_883CCBC8_867D_6FE8_41CB_A8CC3C1C4151); this.mainPlayList.set('selectedIndex', 42)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -160.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -7.75,
   "hfov": 13.79
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DAC1A3B_5233_7A53_41C1_8E8FE86DD926",
   "yaw": -160.49,
   "pitch": -7.75,
   "hfov": 13.79,
   "distance": 100
  }
 ],
 "id": "overlay_0CC762FF_2CE9_3946_41BD_10F7E70EABC4",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_15CDCACE_0E46_E281_419B_D1DF72349238, this.camera_882A3BD2_867D_6FF8_41C4_81901A60856F); this.mainPlayList.set('selectedIndex', 40)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 49.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -4.57,
   "hfov": 13.87
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DADEA3A_5233_7A5D_41A4_309BE3FDF532",
   "yaw": 49.24,
   "pitch": -4.57,
   "hfov": 13.87,
   "distance": 100
  }
 ],
 "id": "overlay_33D096CC_2CD7_194B_41BF_DF83117FB10C",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_152BA07A_0E46_FD81_41A1_67DE57E97658, this.camera_8B8A97EA_867D_67A9_41D0_4AE8671782F7); this.mainPlayList.set('selectedIndex', 41)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -114.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -8.21,
   "hfov": 13.77
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DAD7A3A_5233_7A5D_41C3_3B5BB093DC6D",
   "yaw": -114.19,
   "pitch": -8.21,
   "hfov": 13.77,
   "distance": 100
  }
 ],
 "id": "overlay_0DB45579_2CD7_3B4D_418E_967A4F05DD68",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_15C262D9_0E49_6283_4181_A0951E3715F8, this.camera_887997F9_867D_67AB_41B8_CD77E9B254F5); this.mainPlayList.set('selectedIndex', 36)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_15CDCACE_0E46_E281_419B_D1DF72349238_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -96.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -0.94,
   "hfov": 13.91
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D4A9A2B_5233_7A73_41B3_F338BF667FDD",
   "yaw": -96.48,
   "pitch": -0.94,
   "hfov": 13.91,
   "distance": 100
  }
 ],
 "id": "overlay_18A9220B_0AC6_FD86_4192_079F1B37EABD",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544, this.camera_88030BF3_867D_6FB8_419C_272505295167); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 86.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -5.94,
   "hfov": 13.84
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D4A6A2D_5233_7A74_41C5_02EF42E1E303",
   "yaw": 86.92,
   "pitch": -5.94,
   "hfov": 13.84,
   "distance": 100
  }
 ],
 "id": "overlay_1A1131A4_0AC7_3E82_418B_E91B200626BA",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_09917766_05BF_2381_4162_44384798B870, this.camera_88F09BFD_867D_6FAB_41DD_613049258F68); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -9.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 16.15,
   "hfov": 9.89
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_96DD26D9_867D_59EA_41B4_B213616CBE44",
   "yaw": -9.78,
   "pitch": 16.15,
   "hfov": 9.89,
   "distance": 100
  }
 ],
 "id": "overlay_56C83A5F_4D1A_109C_41D0_50CDB79672CB",
 "data": {
  "label": "Info Red 03"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showWindow(this.window_51DB66B4_4D1A_31AC_41B9_A7326A0C81FB, null, false)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -9.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_1_HS_4_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": 0.5,
   "hfov": 24.71
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_96DDA6DA_867D_59E9_41D4_577D26FC3839",
   "yaw": -9.16,
   "pitch": 0.5,
   "hfov": 24.71,
   "distance": 100
  }
 ],
 "id": "overlay_4191D6DC_523C_EBD6_41C5_7B7E854FD6A6",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE, this.camera_88EFFC07_867D_6867_41DA_3917542BF589); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_09916AFC_05BF_E281_4186_720CA74703AB_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "id": "htmlText_51D926B6_4D1A_31AF_41BF_BE0C603184D4",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 0,
 "height": "100%",
 "propagateClick": false,
 "minWidth": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Poppins Light';\">Tersedia 6 kamar, harga belum diketahui. Silakan hubungi nomor dibawah ini.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:14px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Poppins Light';\">081293224685 Amran</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Poppins Light';\">085761711169 Sukri</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:14px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "data": {
  "name": "HTMLText20798"
 },
 "paddingLeft": 10,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 10,
 "paddingTop": 10
},
{
 "map": {
  "width": 60,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_0_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 979.78,
  "x": 177.82,
  "offsetY": 0,
  "height": 60,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Gerbang"
 },
 "image": {
  "y": 979.78,
  "width": 60,
  "class": "HotspotMapOverlayImage",
  "x": 177.82,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_0.png",
     "class": "ImageResourceLevel",
     "width": 60,
     "height": 60
    }
   ]
  },
  "height": 60
 },
 "useHandCursor": true,
 "id": "overlay_7FDF3563_5A69_5A28_41B8_CD58A22DBDD0",
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "toolTip": "Gerbeng"
  }
 ]
},
{
 "map": {
  "width": 60,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_2_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 712.86,
  "x": 373.55,
  "offsetY": 0,
  "height": 60,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Titik 10"
 },
 "image": {
  "y": 712.86,
  "width": 60,
  "class": "HotspotMapOverlayImage",
  "x": 373.55,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_2.png",
     "class": "ImageResourceLevel",
     "width": 60,
     "height": 60
    }
   ]
  },
  "height": 60
 },
 "useHandCursor": true,
 "id": "overlay_7FDF0563_5A69_5A28_41BE_A1A6A447D9BB",
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "map": {
  "width": 60,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_3_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 712.86,
  "x": 531.87,
  "offsetY": 0,
  "height": 60,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Titik 9"
 },
 "image": {
  "y": 712.86,
  "width": 60,
  "class": "HotspotMapOverlayImage",
  "x": 531.87,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_3.png",
     "class": "ImageResourceLevel",
     "width": 60,
     "height": 60
    }
   ]
  },
  "height": 60
 },
 "useHandCursor": true,
 "id": "overlay_7FDEE563_5A69_5A28_41D1_735DA38F2492",
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "map": {
  "width": 60,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_4_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 712.86,
  "x": 698.12,
  "offsetY": 0,
  "height": 60,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Titik 8"
 },
 "image": {
  "y": 712.86,
  "width": 60,
  "class": "HotspotMapOverlayImage",
  "x": 698.12,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_4.png",
     "class": "ImageResourceLevel",
     "width": 60,
     "height": 60
    }
   ]
  },
  "height": 60
 },
 "useHandCursor": true,
 "id": "overlay_7FDED563_5A69_5A28_41C1_0018A17AA771",
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "map": {
  "width": 60,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_5_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 712.86,
  "x": 835.45,
  "offsetY": 0,
  "height": 60,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Titik 7 Homestay 2"
 },
 "image": {
  "y": 712.86,
  "width": 60,
  "class": "HotspotMapOverlayImage",
  "x": 835.45,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_5.png",
     "class": "ImageResourceLevel",
     "width": 60,
     "height": 60
    }
   ]
  },
  "height": 60
 },
 "useHandCursor": true,
 "id": "overlay_7FDEC563_5A69_5A28_41CB_7F73B6B30857",
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "map": {
  "width": 60,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_8_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 712.86,
  "x": 1134.09,
  "offsetY": 0,
  "height": 60,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Titik 6 jalan raya"
 },
 "image": {
  "y": 712.86,
  "width": 60,
  "class": "HotspotMapOverlayImage",
  "x": 1134.09,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_8.png",
     "class": "ImageResourceLevel",
     "width": 60,
     "height": 60
    }
   ]
  },
  "height": 60
 },
 "useHandCursor": true,
 "id": "overlay_7FDE7565_5A69_5A29_419F_2E68CDA096ED",
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "map": {
  "width": 60,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_9_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 712.86,
  "x": 1276.45,
  "offsetY": 0,
  "height": 60,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Titik 5 jalan raya"
 },
 "image": {
  "y": 712.86,
  "width": 60,
  "class": "HotspotMapOverlayImage",
  "x": 1276.45,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_9.png",
     "class": "ImageResourceLevel",
     "width": 60,
     "height": 60
    }
   ]
  },
  "height": 60
 },
 "useHandCursor": true,
 "id": "overlay_7FDE5565_5A69_5A29_41D1_36C4BAF25873",
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "map": {
  "width": 60,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_10_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 549.41,
  "x": 1410.33,
  "offsetY": 0,
  "height": 60,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "titik 4  (jalan raya)"
 },
 "image": {
  "y": 549.41,
  "width": 60,
  "class": "HotspotMapOverlayImage",
  "x": 1410.33,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_10.png",
     "class": "ImageResourceLevel",
     "width": 60,
     "height": 60
    }
   ]
  },
  "height": 60
 },
 "useHandCursor": true,
 "id": "overlay_7FDE3565_5A69_5A29_41D4_85ED679264B9",
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "map": {
  "width": 60,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_12_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 468.8,
  "x": 1702.81,
  "offsetY": 0,
  "height": 60,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "titik 2 5"
 },
 "image": {
  "y": 468.8,
  "width": 60,
  "class": "HotspotMapOverlayImage",
  "x": 1702.81,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_12.png",
     "class": "ImageResourceLevel",
     "width": 60,
     "height": 60
    }
   ]
  },
  "height": 60
 },
 "useHandCursor": true,
 "id": "overlay_7FDDE565_5A69_5A28_41BC_7E3D6A9D9F13",
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 34)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "map": {
  "width": 60,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_15_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 85.64,
  "x": 227.92,
  "offsetY": 0,
  "height": 60,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": " titik 1 1"
 },
 "image": {
  "y": 85.64,
  "width": 60,
  "class": "HotspotMapOverlayImage",
  "x": 227.92,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_15.png",
     "class": "ImageResourceLevel",
     "width": 60,
     "height": 60
    }
   ]
  },
  "height": 60
 },
 "useHandCursor": true,
 "id": "overlay_551F6E18_74FE_1925_41B3_5A7F8BEB4CD4",
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 44)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "map": {
  "width": 60,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_16_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 316.36,
  "x": 115.87,
  "offsetY": 0,
  "height": 60,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "titik 2 1"
 },
 "image": {
  "y": 316.36,
  "width": 60,
  "class": "HotspotMapOverlayImage",
  "x": 115.87,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_16.png",
     "class": "ImageResourceLevel",
     "width": 60,
     "height": 60
    }
   ]
  },
  "height": 60
 },
 "useHandCursor": true,
 "id": "overlay_57FC913D_74FE_0B5F_41A1_109891D7044E",
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 38)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "map": {
  "width": 60,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_17_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 413.29,
  "x": 115.87,
  "offsetY": 0,
  "height": 60,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "titik 3 (sebelah titik 2)"
 },
 "image": {
  "y": 413.29,
  "width": 60,
  "class": "HotspotMapOverlayImage",
  "x": 115.87,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_17.png",
     "class": "ImageResourceLevel",
     "width": 60,
     "height": 60
    }
   ]
  },
  "height": 60
 },
 "useHandCursor": true,
 "id": "overlay_5741054A_74FE_0B25_41DD_09A09EBC54CE",
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 39)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "map": {
  "width": 60,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_18_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 674.43,
  "x": 264.3,
  "offsetY": 0,
  "height": 60,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Titik 11 Pantai"
 },
 "image": {
  "y": 674.43,
  "width": 60,
  "class": "HotspotMapOverlayImage",
  "x": 264.3,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_18.png",
     "class": "ImageResourceLevel",
     "width": 60,
     "height": 60
    }
   ]
  },
  "height": 60
 },
 "useHandCursor": true,
 "id": "overlay_50E10E3B_74FE_3964_41B2_19A948E11EA7",
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "map": {
  "width": 60,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_19_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 574.23,
  "x": 835.45,
  "offsetY": 0,
  "height": 60,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Titik 7 Homestay view pantai"
 },
 "image": {
  "y": 574.23,
  "width": 60,
  "class": "HotspotMapOverlayImage",
  "x": 835.45,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_19.png",
     "class": "ImageResourceLevel",
     "width": 60,
     "height": 60
    }
   ]
  },
  "height": 60
 },
 "useHandCursor": true,
 "id": "overlay_50160385_74FE_0F2C_41AD_55995D2171D8",
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "map": {
  "width": 60,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_20_map.gif",
     "class": "ImageResourceLevel",
     "width": 16,
     "height": 16
    }
   ]
  },
  "y": 574.23,
  "x": 1003.48,
  "offsetY": 0,
  "height": 60,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "rollOverDisplay": false,
 "data": {
  "label": "Titik 6 view pantai"
 },
 "image": {
  "y": 574.23,
  "width": 60,
  "class": "HotspotMapOverlayImage",
  "x": 1003.48,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_7FDF4563_5A69_5A28_41CB_6937066B3391_HS_20.png",
     "class": "ImageResourceLevel",
     "width": 60,
     "height": 60
    }
   ]
  },
  "height": 60
 },
 "useHandCursor": true,
 "id": "overlay_5186C6FD_74FA_16DF_41D2_ED9214C62015",
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 94.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -3.67,
   "hfov": 13.89
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB30A30_5233_7A6C_41C7_78EB0891E777",
   "yaw": 94.19,
   "pitch": -3.67,
   "hfov": 13.89,
   "distance": 100
  }
 ],
 "id": "overlay_18170D1B_0ECB_2787_419A_6DD0A56AD0F7",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4, this.camera_890049A9_867D_6BA8_41E0_298FC5AD36B3); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -83.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -1.85,
   "hfov": 13.91
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB2EA30_5233_7A6C_41B5_57964BD464A5",
   "yaw": -83.77,
   "pitch": -1.85,
   "hfov": 13.91,
   "distance": 100
  }
 ],
 "id": "overlay_1E059997_0ECB_6E8F_4199_0AAD9EC48DB6",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_09917766_05BF_2381_4162_44384798B870, this.camera_89FFA9B6_867D_6BB8_41DE_5F5C42C76B3E); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 92.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -6.39,
   "hfov": 13.83
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DAF3A3A_5233_7A5D_41C5_E016817F9498",
   "yaw": 92.83,
   "pitch": -6.39,
   "hfov": 13.83,
   "distance": 100
  }
 ],
 "id": "overlay_312DE3EE_2CDB_3F46_41BF_0BF5143AB04D",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_15C25C28_0E49_6581_418D_F485BF9783EC, this.camera_898E2A0D_867D_686B_41BF_645444C3E010); this.mainPlayList.set('selectedIndex', 38)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 130.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -5.94,
   "hfov": 13.84
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DAE5A3A_5233_7A5D_41BC_957871324BDC",
   "yaw": 130.96,
   "pitch": -5.94,
   "hfov": 13.84,
   "distance": 100
  }
 ],
 "id": "overlay_33B03C99_2CDB_09CD_41B5_C5BBEA7DCD35",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56, this.camera_899E6A03_867D_6858_41D1_35A458031B35); this.mainPlayList.set('selectedIndex', 37)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -123.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -6.84,
   "hfov": 13.82
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB47A30_5233_7A6C_41B6_8040B63ADA22",
   "yaw": -123.26,
   "pitch": -6.84,
   "hfov": 13.82,
   "distance": 100
  }
 ],
 "id": "overlay_111952F8_0E4E_E281_41A0_FB03C172D293",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4, this.camera_88543BB3_867D_6FB8_41DA_A649DF251C6F); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 81.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -19.1,
   "hfov": 13.15
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB3DA30_5233_7A6C_41B6_59A217589FD7",
   "yaw": 81.48,
   "pitch": -19.1,
   "hfov": 13.15,
   "distance": 100
  }
 ],
 "id": "overlay_105A5A79_0E4F_6D83_4198_0CAADA20E57B",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D, this.camera_88405BBD_867D_6FA8_41E0_8E2232E75B18); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8B354743_867D_58D8_41D5_D87A26FAC1B5, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "media": "this.panorama_0E6A508E_0571_E910_4182_3FA194973CF0",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8B354743_867D_58D8_41D5_D87A26FAC1B5",
 "camera": "this.panorama_0E6A508E_0571_E910_4182_3FA194973CF0_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8B292749_867D_58E8_41C8_F66925B5B81E, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "media": "this.panorama_0E4E731A_0571_6F31_4162_D4BA007223D8",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8B292749_867D_58E8_41C8_F66925B5B81E",
 "camera": "this.panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8B298749_867D_58E8_41D6_D8B3D231E6C7, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "media": "this.panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8B298749_867D_58E8_41D6_D8B3D231E6C7",
 "camera": "this.panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8B2A174A_867D_58E8_4162_063FED218433, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
 "media": "this.panorama_0E4C7505_0571_2B10_418D_58B200FF616A",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8B2A174A_867D_58E8_4162_063FED218433",
 "camera": "this.panorama_0E4C7505_0571_2B10_418D_58B200FF616A_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8B2B474A_867D_58E8_41A5_71551A6D03DE, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
 "media": "this.panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8B2B474A_867D_58E8_41A5_71551A6D03DE",
 "camera": "this.panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8B2B974C_867D_58E8_41C9_2ACDBB64AC66, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 10, 11)",
 "media": "this.panorama_09916AFC_05BF_E281_4186_720CA74703AB",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8B2B974C_867D_58E8_41C9_2ACDBB64AC66",
 "camera": "this.panorama_09916AFC_05BF_E281_4186_720CA74703AB_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8B2CF74D_867D_58E8_41D8_67771FE8B92D, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 13, 14)",
 "media": "this.panorama_08B36D2B_05B9_2786_417C_E427144A44E5",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8B2CF74D_867D_58E8_41D8_67771FE8B92D",
 "camera": "this.panorama_08B36D2B_05B9_2786_417C_E427144A44E5_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8B2D374D_867D_58E8_41A4_8F065CDB019A, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 16, 17)",
 "media": "this.panorama_19C52053_0EFF_5D87_4196_595FEE001077",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8B2D374D_867D_58E8_41A4_8F065CDB019A",
 "camera": "this.panorama_19C52053_0EFF_5D87_4196_595FEE001077_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8B2F474E_867D_58E8_41D6_8A1FE0EA1618, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 21, 22)",
 "media": "this.panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8B2F474E_867D_58E8_41D6_8A1FE0EA1618",
 "camera": "this.panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8B2E574F_867D_58E8_41E0_91D38DCAD095, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 23, 24)",
 "media": "this.panorama_1135AE32_0E7E_E581_4165_7567158085FA",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8B2E574F_867D_58E8_41E0_91D38DCAD095",
 "camera": "this.panorama_1135AE32_0E7E_E581_4165_7567158085FA_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8B2F474F_867D_58E8_41D3_20EA5D357A5D, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 26, 27)",
 "media": "this.panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8B2F474F_867D_58E8_41D3_20EA5D357A5D",
 "camera": "this.panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8B211751_867D_58F8_41CF_04D4FE25A15F, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 34, 35)",
 "media": "this.panorama_1528A598_0E47_2682_419F_D4D43FD887F8",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8B211751_867D_58F8_41CF_04D4FE25A15F",
 "camera": "this.panorama_1528A598_0E47_2682_419F_D4D43FD887F8_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8B222752_867D_58F8_41DD_3EF4EDB6842F, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 38, 39)",
 "media": "this.panorama_15C25C28_0E49_6581_418D_F485BF9783EC",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8B222752_867D_58F8_41DD_3EF4EDB6842F",
 "camera": "this.panorama_15C25C28_0E49_6581_418D_F485BF9783EC_camera"
},
{
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8B228752_867D_58F8_41D6_407060EA6FDE, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 39, 40)",
 "media": "this.panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8B228752_867D_58F8_41D6_407060EA6FDE",
 "camera": "this.panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_camera"
},
{
 "class": "PanoramaPlayListItem",
 "end": "this.trigger('tourEnded')",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_8B240753_867D_58F8_41D7_4D9243067A3E, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 44, 0)",
 "media": "this.panorama_15C2515F_0E49_3FBF_4197_AB506B14A635",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_8B240753_867D_58F8_41D7_4D9243067A3E",
 "camera": "this.panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_camera"
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 67.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": 10.86,
   "hfov": 13.66
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DBB6A34_5233_7A54_41CE_F7F05A5DC395",
   "yaw": 67.86,
   "pitch": 10.86,
   "hfov": 13.66,
   "distance": 100
  }
 ],
 "id": "overlay_2282244F_2CB9_1945_4199_1ACDEB3CA150",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D, this.camera_890AFCE2_867D_69D9_41D9_41923A378043); this.mainPlayList.set('selectedIndex', 28)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 80.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -9.11,
   "hfov": 13.74
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DBADA35_5233_7A54_41C0_BA8178636EBF",
   "yaw": 80.57,
   "pitch": -9.11,
   "hfov": 13.74,
   "distance": 100
  }
 ],
 "id": "overlay_3C8D206B_2CBB_394D_41BD_EB4017E0B4A1",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE, this.camera_891CBCC5_867D_69DB_41D4_FAA4ECCFEB43); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 126.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -31.36,
   "hfov": 11.88
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB96A35_5233_7A54_41D2_9322DD5011A4",
   "yaw": 126.42,
   "pitch": -31.36,
   "hfov": 11.88,
   "distance": 100
  }
 ],
 "id": "overlay_3EC87CD5_2CA9_0945_417F_24F0D010A59E",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -115.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": 8.59,
   "hfov": 13.76
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DBD6A33_5233_7A6C_41D4_86A258266480",
   "yaw": -115.55,
   "pitch": 8.59,
   "hfov": 13.76,
   "distance": 100
  }
 ],
 "id": "overlay_1685A285_0E5B_2283_4183_644C942570B8",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1135AE32_0E7E_E581_4165_7567158085FA, this.camera_885A1BA8_867D_6FA8_41D7_D801A5B4E24A); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -61.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 27.33,
   "hfov": 9.15
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8B41D72E_867D_58A8_4181_A0BA55358052",
   "yaw": -61.6,
   "pitch": 27.33,
   "hfov": 9.15,
   "distance": 100
  }
 ],
 "id": "overlay_540164B1_4D1A_31A4_41C9_BA2DABD6FB41",
 "data": {
  "label": "Info Red 03"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showWindow(this.window_514F27ED_4D1A_7FBC_41D2_9560EC28E7F3, null, false)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -170.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -14.56,
   "hfov": 13.47
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DABBA3B_5233_7A53_41D3_36D459A98BFD",
   "yaw": -170.48,
   "pitch": -14.56,
   "hfov": 13.47,
   "distance": 100
  }
 ],
 "id": "overlay_0D9D8050_2CEB_195B_41B9_1586DE66486A",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_152BA07A_0E46_FD81_41A1_67DE57E97658, this.camera_8BE3DAF3_867D_69B8_41DA_1816306F12AE); this.mainPlayList.set('selectedIndex', 41)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 12.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -9.57,
   "hfov": 13.72
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DAACA3B_5233_7A53_41C4_692F12D97F26",
   "yaw": 12.02,
   "pitch": -9.57,
   "hfov": 13.72,
   "distance": 100
  }
 ],
 "id": "overlay_0E175FB8_2CE9_07CB_4198_948C904764F6",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE, this.camera_8BD80AFF_867D_69A8_41DD_35A88C23272E); this.mainPlayList.set('selectedIndex', 43)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 159.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -13.65,
   "hfov": 13.52
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DA01A39_5233_7A5F_41C1_25FD086882F4",
   "yaw": 159.11,
   "pitch": -13.65,
   "hfov": 13.52,
   "distance": 100
  }
 ],
 "id": "overlay_37641C23_2CD9_08FD_4192_0E647D69F8A2",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56, this.camera_8872DB92_867D_6878_41D1_DAD3FE9C1091); this.mainPlayList.set('selectedIndex', 37)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -93.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -2.76,
   "hfov": 13.9
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DAFBA39_5233_7A5F_41B4_ACA7E51B383F",
   "yaw": -93.3,
   "pitch": -2.76,
   "hfov": 13.9,
   "distance": 100
  }
 ],
 "id": "overlay_32847C0D_2CDB_08C5_4197_FF9ECD79F1A6",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813, this.camera_886E2B9D_867D_6868_41C3_0CAE5CB47B19); this.mainPlayList.set('selectedIndex', 39)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_15C25C28_0E49_6581_418D_F485BF9783EC_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 32.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 18,
      "height": 16
     }
    ]
   },
   "pitch": -34.68,
   "hfov": 12.87
  }
 ],
 "useHandCursor": true,
 "enabled": false,
 "items": [
  {
   "yaw": 32.25,
   "hfov": 12.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_1_HS_0_0.png",
      "class": "ImageResourceLevel",
      "width": 264,
      "height": 230
     }
    ]
   },
   "pitch": -34.68
  }
 ],
 "id": "overlay_1A2F1118_0ACA_DF82_418C_F886B3A50C36",
 "data": {
  "label": "Image"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_08B36D2B_05B9_2786_417C_E427144A44E5, this.camera_8877E808_867D_6868_41DC_97E9B9DC7BCC); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -138.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -10.42,
   "hfov": 24.3
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8B4DE728_867D_58A8_41D9_6ACBFD974525",
   "yaw": -138.27,
   "pitch": -10.42,
   "hfov": 24.3,
   "distance": 100
  }
 ],
 "id": "overlay_456563D6_5235_29D5_41AD_BA37FCE30D4B",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_09916AFC_05BF_E281_4186_720CA74703AB, this.camera_88542821_867D_685B_41CC_A67BC8C23FAB); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 32.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_1_HS_3_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -34.44,
   "hfov": 20.38
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_8B4D8729_867D_58A8_41D8_0DD777B288EB",
   "yaw": 32.98,
   "pitch": -34.44,
   "hfov": 20.38,
   "distance": 100
  }
 ],
 "id": "overlay_41B0B0DA_5237_27DD_41C2_3558457BC6EA",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_08B36D2B_05B9_2786_417C_E427144A44E5, this.camera_8866F811_867D_687B_41CD_9FB48C49FA52); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 160.01,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -7.75,
   "hfov": 13.79
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB55A2F_5233_7A74_41CE_87EBF8A7445B",
   "yaw": 160.01,
   "pitch": -7.75,
   "hfov": 13.79,
   "distance": 100
  }
 ],
 "id": "overlay_1C13970B_0E59_6387_41A6_17C9973C092B",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_18A51027_0EF9_3D8F_4187_38630AC4D588, this.camera_8BA71B63_867D_68D8_41B0_47E784DE19BF); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -13.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -2.76,
   "hfov": 13.9
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5DB4CA2F_5233_7A74_41B0_71E5706499EC",
   "yaw": -13.4,
   "pitch": -2.76,
   "hfov": 13.9,
   "distance": 100
  }
 ],
 "id": "overlay_1C680D42_0E5B_E781_417A_638E4774FEE8",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D, this.camera_8BAC8B58_867D_68E8_41DD_996EF0164E3C); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_19C52053_0EFF_5D87_4196_595FEE001077_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -20.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_1_HS_0_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -4.12,
   "hfov": 13.88
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D407A29_5233_7A7F_41C2_DAA07D1FAF23",
   "yaw": -20.21,
   "pitch": -4.12,
   "hfov": 13.88,
   "distance": 100
  }
 ],
 "id": "overlay_1706CE31_058F_1970_4193_F9377D70E48E",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78, this.camera_8BEDAAE3_867D_69D8_41D3_100092D91DC8); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 174.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_1_HS_1_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 38,
      "height": 16
     }
    ]
   },
   "pitch": -9.57,
   "hfov": 13.72
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_5D403A29_5233_7A7E_41B0_67DD9D4EC54D",
   "yaw": 174.09,
   "pitch": -9.57,
   "hfov": 13.72,
   "distance": 100
  }
 ],
 "id": "overlay_16E19ED3_05B1_F937_418F_5DC3324D7FF0",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_0E6ECE99_0571_F930_4187_CDDECD89D395, this.camera_8BEA2AD4_867D_69F8_41B6_27F1D550DD2C); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 83.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_1_HS_2_0_0_map.gif",
      "class": "ImageResourceLevel",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.73,
   "hfov": 10.28
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_96E7E6D7_867D_59E7_41DD_8285D366A519",
   "yaw": 83.02,
   "pitch": -2.73,
   "hfov": 10.28,
   "distance": 100
  }
 ],
 "id": "overlay_5325ABDD_4EEE_379C_41CB_C299FDDD4EE0",
 "data": {
  "label": "Info Red 03"
 },
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showWindow(this.window_53D6680D_4EEE_707C_41C5_32227A86EE70, null, false)",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "TripodCapPanoramaOverlay",
 "angle": 0,
 "inertia": false,
 "hfov": 45,
 "rotate": false,
 "id": "panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_tcap0",
 "distance": 50,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_tcap0.png",
    "class": "ImageResourceLevel",
    "width": 568,
    "height": 568
   }
  ]
 }
},
{
 "paddingLeft": 0,
 "fontFamily": "Poppins ExtraBold",
 "textDecoration": "none",
 "id": "Label_0A5C65D9_16A5_98B3_41B4_573FE3033A1F",
 "left": "5%",
 "width": "157.07%",
 "class": "Label",
 "shadow": false,
 "backgroundOpacity": 0,
 "text": "DESA TELUK MATA IKAN",
 "horizontalAlign": "left",
 "borderRadius": 0,
 "minHeight": 1,
 "height": "67.24%",
 "top": "0%",
 "propagateClick": false,
 "fontSize": "40px",
 "minWidth": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Heading"
 },
 "fontWeight": "bold",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "fontFamily": "Poppins ExtraLight",
 "textDecoration": "none",
 "id": "Label_0B130419_16A3_7FB3_41A4_E5F9FA0AC39B",
 "left": "5%",
 "width": "83.351%",
 "class": "Label",
 "shadow": false,
 "backgroundOpacity": 0,
 "text": "Tourism Village 360 Maps",
 "horizontalAlign": "left",
 "borderRadius": 0,
 "borderSize": 0,
 "minHeight": 1,
 "height": "31.897%",
 "propagateClick": false,
 "fontSize": 30,
 "minWidth": 1,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "bottom": "18.1%",
 "data": {
  "name": "Sub Heading"
 },
 "fontWeight": "normal",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "gap": 10,
 "paddingLeft": 0,
 "id": "Container_4C4485F0_5A2A_DA27_41C7_F052846B4233",
 "left": "0%",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "2.304%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.9,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "minHeight": 1,
 "backgroundColorRatios": [
  0
 ],
 "top": "0%",
 "propagateClick": false,
 "backgroundColor": [
  "#FF9900"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "height": "100%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container11173"
 },
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "fontFamily": "Poppins Medium",
 "paddingLeft": 0,
 "id": "Label_4AD062F3_57CA_98EA_41D3_133750B0BF91",
 "left": "5%",
 "width": "12.402%",
 "class": "Label",
 "shadow": false,
 "backgroundOpacity": 0.9,
 "text": "Map",
 "horizontalAlign": "center",
 "borderRadius": 20,
 "textDecoration": "none",
 "minHeight": 1,
 "backgroundColorRatios": [
  0.13
 ],
 "top": "30%",
 "propagateClick": false,
 "click": "if(!this.MapViewer.get('visible')){ this.setComponentVisibility(this.MapViewer, true, 0, this.effect_7D91432D_57CA_B97E_419B_757E756EBFB9, 'showEffect', false) } else { this.setComponentVisibility(this.MapViewer, false, 0, this.effect_7D91332D_57CA_B97E_41CC_A143DC50AC53, 'hideEffect', false) }",
 "backgroundColor": [
  "#FF9900"
 ],
 "fontSize": "2.5vmin",
 "minWidth": 1,
 "borderSize": 0,
 "height": "33.058%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Map Button"
 },
 "fontWeight": "normal",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "fontFamily": "Poppins Medium",
 "paddingLeft": 0,
 "id": "Label_415E45CF_57C6_993A_41D5_BCB9500494C2",
 "left": "20%",
 "width": "12.402%",
 "class": "Label",
 "shadow": false,
 "backgroundOpacity": 0.9,
 "text": "Point List",
 "horizontalAlign": "center",
 "borderRadius": 20,
 "textDecoration": "none",
 "minHeight": 1,
 "backgroundColorRatios": [
  0.13
 ],
 "top": "30%",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_42B697D2_5CC7_4312_41C3_D35F999D31FE, true, 0, this.effect_7CF2A688_5CC3_45FE_4192_C6A9CA5912C2, 'showEffect', false)",
 "backgroundColor": [
  "#FF9900"
 ],
 "fontSize": "2.5vmin",
 "minWidth": 1,
 "borderSize": 0,
 "height": "33.058%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Point List Button"
 },
 "fontWeight": "normal",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "fontFamily": "Poppins Medium",
 "paddingLeft": 0,
 "id": "Label_57F953B6_74FA_0F6C_41D0_106BEBF633D1",
 "left": "35%",
 "width": "12.402%",
 "class": "Label",
 "shadow": false,
 "backgroundOpacity": 0.9,
 "text": "About Us",
 "horizontalAlign": "center",
 "borderRadius": 20,
 "textDecoration": "none",
 "minHeight": 1,
 "backgroundColorRatios": [
  0.13
 ],
 "top": "30%",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_4E6C6158_5A36_BA67_41D5_8CC28887B5D9, true, 0, this.effect_5636AD98_74FA_FB25_41CE_509AFDF36B8B, 'showEffect', false)",
 "backgroundColor": [
  "#FF9900"
 ],
 "fontSize": "2.5vmin",
 "minWidth": 1,
 "borderSize": 0,
 "height": "33.058%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "data": {
  "name": "About Us Button"
 },
 "fontWeight": "normal",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "gap": 10,
 "id": "Container_42B6C7D2_5CC7_4312_4194_E38643787E94",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "class": "Container",
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarMargin": 2,
 "shadow": true,
 "backgroundOpacity": 1,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 0,
 "overflow": "visible",
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "borderSize": 0,
 "top": "10%",
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "children": [
  "this.Container_42B6D7D2_5CC7_4312_41B2_3D18F06F24ED",
  "this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0"
 ],
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Global"
 },
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "gap": 0,
 "id": "Container_4E6D4157_5A36_BA69_41C3_66AC7B50DE12",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "class": "Container",
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarMargin": 2,
 "shadow": true,
 "backgroundOpacity": 1,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "shadowHorizontalLength": 0,
 "overflow": "scroll",
 "shadowOpacity": 0.3,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "borderSize": 0,
 "top": "10%",
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "bottom": "10%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "children": [
  "this.Container_4E6D6157_5A36_BA69_41D5_C28962F70D7B",
  "this.Container_4E6D9157_5A36_BA69_41B9_07B1C36AE9E9",
  "this.Container_4E6DA158_5A36_BA67_41BB_EDA42D69784A"
 ],
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Global"
 },
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "gap": 10,
 "children": [
  "this.IconButton_4E6C5158_5A36_BA67_41D4_67E4CA649850"
 ],
 "id": "Container_4E6C3158_5A36_BA67_41C9_74C5380CC87D",
 "left": "15%",
 "scrollBarMargin": 2,
 "class": "Container",
 "right": "15%",
 "shadow": false,
 "overflow": "visible",
 "backgroundOpacity": 0,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "borderSize": 0,
 "top": "10%",
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "bottom": "80%",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "paddingRight": 20,
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container X global"
 },
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 20
},
{
 "backgroundColorDirection": "vertical",
 "gap": 10,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "paddingLeft": 0,
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "scrollBarMargin": 2,
 "class": "Container",
 "right": "15%",
 "shadow": false,
 "overflow": "visible",
 "backgroundOpacity": 1,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "borderRadius": 30,
 "borderSize": 0,
 "top": "7%",
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "bottom": "7%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Global"
 },
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "id": "Image_9511127C_9B79_D2C1_41D8_D080B87BFD84",
 "left": "0%",
 "maxWidth": 3000,
 "class": "Image",
 "right": "1.88%",
 "maxHeight": 2,
 "shadow": false,
 "backgroundOpacity": 0,
 "url": "skin/Image_9511127C_9B79_D2C1_41D8_D080B87BFD84.png",
 "horizontalAlign": "center",
 "borderRadius": 0,
 "top": 36,
 "minHeight": 1,
 "height": 2,
 "propagateClick": false,
 "borderSize": 0,
 "minWidth": 1,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "scaleMode": "fit_outside",
 "data": {
  "name": "white line"
 },
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 30,
 "gap": 3,
 "children": [
  "this.Button_03D37B27_0C7A_63B3_41A1_89572D8C8762",
  "this.Button_1FDDCF4A_0C0A_23FD_417A_1C14E098FDFD",
  "this.Button_1CA392FC_0C0A_2295_41A3_18DEA65FB6AD",
  "this.Button_1FE4B611_0C0A_256F_418E_EA27E66F8360",
  "this.Button_1EBF3282_0C0A_1D6D_4190_52FC7F8C00A5",
  "this.Button_33E0F47E_11C1_A20D_419F_BB809AD89259"
 ],
 "id": "Container_9A7696F9_9256_4198_41E2_40E7CF09A427",
 "left": "0%",
 "width": 1199,
 "class": "Container",
 "scrollBarMargin": 2,
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "borderSize": 0,
 "height": 51,
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "bottom": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "middle",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "-button set container"
 },
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "gap": 10,
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "width": 110,
 "class": "Container",
 "right": "0%",
 "scrollBarMargin": 2,
 "shadow": false,
 "overflow": "visible",
 "backgroundOpacity": 0,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": 110,
 "minHeight": 1,
 "top": "0%",
 "propagateClick": false,
 "borderSize": 0,
 "minWidth": 1,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "middle",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "button menu sup"
 },
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "gap": 3,
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
  "this.IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521"
 ],
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "scrollBarMargin": 2,
 "class": "Container",
 "right": "0%",
 "width": "91.304%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "borderSize": 0,
 "minHeight": 1,
 "height": "85.959%",
 "propagateClick": false,
 "minWidth": 1,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "bottom": "0%",
 "visible": false,
 "data": {
  "name": "-button set"
 },
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "gap": 10,
 "id": "Container_04FF5C2C_1216_7593_41B2_1B5CFADF351D",
 "left": "10%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "class": "Container",
 "shadowColor": "#000000",
 "right": "10%",
 "scrollBarMargin": 2,
 "shadow": true,
 "backgroundOpacity": 1,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "shadowHorizontalLength": 0,
 "overflow": "scroll",
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "borderSize": 0,
 "top": "5%",
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "bottom": "5%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "children": [
  "this.Container_04FF2C2C_1216_7593_4195_88C3C7049763",
  "this.Container_04FF0C2C_1216_7593_419A_8AC354592A51"
 ],
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Global"
 },
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "gap": 10,
 "children": [
  "this.IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A"
 ],
 "id": "Container_04FF9C2D_1216_75ED_41A8_E3495D8F554E",
 "left": "10%",
 "scrollBarMargin": 2,
 "class": "Container",
 "right": "10%",
 "shadow": false,
 "overflow": "visible",
 "backgroundOpacity": 0,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "borderSize": 0,
 "top": "5%",
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "bottom": "84.78%",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "paddingRight": 20,
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container X global"
 },
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 20
},
{
 "paddingLeft": 0,
 "gap": 10,
 "id": "Container_1813AA3E_1663_8BF1_41A2_CA5EE3718362",
 "left": "10%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "class": "Container",
 "shadowColor": "#000000",
 "right": "10%",
 "scrollBarMargin": 2,
 "shadow": true,
 "backgroundOpacity": 1,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "shadowHorizontalLength": 0,
 "overflow": "scroll",
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "borderSize": 0,
 "top": "5%",
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "bottom": "5%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "children": [
  "this.Container_1813DA3E_1663_8BF1_4193_F28A53801FBC",
  "this.Container_1813FA3E_1663_8BF1_4180_5027A2A87866"
 ],
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Global"
 },
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "gap": 10,
 "children": [
  "this.IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1"
 ],
 "id": "Container_1812AA3F_1663_8BEF_41A4_02F566B1BC6D",
 "left": "10%",
 "scrollBarMargin": 2,
 "class": "Container",
 "right": "10%",
 "shadow": false,
 "overflow": "visible",
 "backgroundOpacity": 0,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "borderSize": 0,
 "top": "5%",
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "bottom": "80%",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "paddingRight": 20,
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container X global"
 },
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 20
},
{
 "paddingLeft": 10,
 "gap": 10,
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "class": "Container",
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarMargin": 2,
 "shadow": true,
 "backgroundOpacity": 1,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "shadowHorizontalLength": 0,
 "overflow": "visible",
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "borderSize": 0,
 "top": "7%",
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "bottom": "7%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "paddingRight": 10,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Global"
 },
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 10,
 "paddingTop": 10
},
{
 "paddingLeft": 0,
 "gap": 10,
 "id": "Container_0DEF7FEC_12FA_D293_4197_332CA20EDBCF",
 "left": "10%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "class": "Container",
 "shadowColor": "#000000",
 "right": "10%",
 "scrollBarMargin": 2,
 "shadow": true,
 "backgroundOpacity": 1,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "shadowHorizontalLength": 0,
 "overflow": "scroll",
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "borderSize": 0,
 "top": "5%",
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "bottom": "5%",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "shadowVerticalLength": 0,
 "minWidth": 1,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "children": [
  "this.Container_0DEC9FEC_12FA_D293_41A0_DAD5B350B643",
  "this.Container_0DECBFED_12FA_D26D_41AD_EE1B8CC7BCC8"
 ],
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Global"
 },
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "gap": 10,
 "children": [
  "this.IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4"
 ],
 "id": "Container_0DEC1FED_12FA_D26D_41AE_8CE7699C44D8",
 "left": "10%",
 "scrollBarMargin": 2,
 "class": "Container",
 "right": "10%",
 "shadow": false,
 "overflow": "visible",
 "backgroundOpacity": 0,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "borderSize": 0,
 "top": "5%",
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "bottom": "80%",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "paddingRight": 20,
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container X global"
 },
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 20
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA5BA37_5233_7A54_41D0_4F1AEE0E761D",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA53A37_5233_7A54_41D2_753B4FBA6DE8",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_15CDE00F_0E47_3D9E_419E_488FC8DD9773_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB8FA35_5233_7A54_41CE_317CD0AAB290",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB87A36_5233_7A54_41A9_82110CCC3AE9",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1528DFC3_0E47_6287_4168_2A5FED85E797_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DBFAA32_5233_7A6C_41AA_2903D20CFE0B",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DBF0A32_5233_7A6C_41C4_E94FC35E3C4A",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DBEFA32_5233_7A6C_4186_3C6959C93209",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1135AE32_0E7E_E581_4165_7567158085FA_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA20A38_5233_7A5D_41CF_420D994DCE71",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA19A38_5233_7A5D_41D2_D0C1A42FE4F5",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA10A38_5233_7A5D_41A9_8B06633E4FFE",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_15C262D9_0E49_6283_4181_A0951E3715F8_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA4BA37_5233_7A53_41D1_929B3E92CECE",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA3CA37_5233_7A53_41B0_942A7DA2B9EE",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1528A598_0E47_2682_419F_D4D43FD887F8_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D4E4A2B_5233_7A73_41D3_DA04F44B4880",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D4E0A2B_5233_7A73_41C6_C151A90E9083",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E42CECD_0571_1913_4164_CCF35AE78A87_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DBC0A33_5233_7A6C_41B0_BD16518071B8",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DBBFA33_5233_7A6C_41CB_A6D1A24A9553",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DBB6A34_5233_7A54_41AE_AD606D70D275",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DBAFA34_5233_7A54_41B9_D2F387340541",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_8B42172F_867D_58A8_419B_8157673BE58C",
 "frameCount": 24,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1758C8AD_0E49_2E83_41A0_C26CB29C27AE_1_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 500,
   "height": 750
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB4EA30_5233_7A6C_41D4_3B47D51F4C27",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_19C50517_0EFF_278F_418F_A1A6D818ED77_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB45A2F_5233_7A74_41C6_D15806745D7A",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB59A2F_5233_7A74_41A0_8552BBA5FAAE",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB50A2F_5233_7A74_41B3_54A967BB4D26",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_19E4BABE_0EFF_22FE_4152_1AFEEB97755D_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB73A2E_5233_7A74_41C3_E2E24D628524",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB68A2E_5233_7A74_41CA_AE9BE2701EA1",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09E862BD_05BF_2283_414A_51FC94FA0BA2_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA90A3C_5233_7A55_41BD_3D9476718ED0",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_15C2515F_0E49_3FBF_4197_AB506B14A635_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DBA6A35_5233_7A54_41D3_DE7D9D598818",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB9FA35_5233_7A54_41A9_687253C6E01E",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1634C79B_0E49_2287_41A1_74FBD1248A6D_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB04A31_5233_7A6C_41C9_04FD228FF4F8",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB01A31_5233_7A6C_41D0_8100C59E8BF1",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1D1111B2_0EFE_DE81_4172_6AEAB8593F59_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DBE7A32_5233_7A6C_41CA_4EA51A6872A6",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DBDDA33_5233_7A6C_4198_095382EC1463",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_10DDC880_0E7F_2E82_4192_D9B8CB9D4DB0_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D4E7A2A_5233_7A7D_41C1_4A1F1501A1A8",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D4DCA2A_5233_7A7D_41D0_A674C2DD9FAA",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_96D916D8_867D_59E9_41D7_7D5B8B245ED2",
 "frameCount": 24,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E4C7505_0571_2B10_418D_58B200FF616A_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 500,
   "height": 750
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB25A30_5233_7A6C_41A2_95A9EBCAB9C4",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB1CA31_5233_7A6C_41AD_7095A64CE9B5",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB19A31_5233_7A6C_419D_D82C2B1DE5EB",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_8B40272C_867D_58A8_41C3_0CEA2DA4F994",
 "frameCount": 24,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_199C5DB1_0EF9_E682_41A3_86F5E38356C4_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 500,
   "height": 750
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA6BA36_5233_7A54_41CF_267FA6086E0C",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA63A36_5233_7A54_41B2_8AA05704AEC8",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_15314A2E_0E47_2D81_41A5_53DE51CF0065_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DAA6A3C_5233_7A55_41CB_9E111B06EDAD",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA9EA3C_5233_7A55_41D0_0547247553FF",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1539DB7F_0E49_227F_4147_AC1271D60DEE_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D4ECA2A_5233_7A7D_41B4_138040D2E944",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D4E8A2A_5233_7A7D_41C6_F9C1DD9F0F25",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E6ECE99_0571_F930_4187_CDDECD89D395_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB7AA2E_5233_7A74_41CC_FD82BDE2C07E",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_8B4E0729_867D_58A8_41DD_DCD3B688575B",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_08B36D2B_05B9_2786_417C_E427144A44E5_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB60A2E_5233_7A74_41C0_6A033C7AFDFC",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB5DA2E_5233_7A74_41C3_6B9A915BB9A1",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_18A51027_0EF9_3D8F_4187_38630AC4D588_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D449A27_5233_7A73_41D1_2EBD4E61E8E9",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D447A27_5233_7A73_41D4_29F570B377F1",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D443A27_5233_7A73_41C8_061F6466B11E",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_96E3F6D3_867D_59FF_41A2_3EF09E07FC06",
 "frameCount": 24,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E6EAD5B_0571_1B30_418F_AB87E0ACFE78_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 500,
   "height": 750
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA20A38_5233_7A5D_41C6_EDC0C52530B3",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA18A39_5233_7A5F_41CA_A1EF6E7FE476",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA10A39_5233_7A5F_41A7_A8573BEFC2E5",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA08A39_5233_7A5F_4190_052F1DE88C6E",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_153D00B0_0E49_7E82_41A1_C5DBFD5A0D56_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA7AA36_5233_7A54_41C7_4D46FF1E7377",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA71A36_5233_7A54_41D1_E169EFEB1B45",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_15CD94F3_0E47_6687_4178_848F8F9858B3_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D408A29_5233_7A7F_41AE_788321B649AB",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E4E731A_0571_6F31_4162_D4BA007223D8_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D4BFA2B_5233_7A73_41D3_FCCED5617D03",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D4B4A2B_5233_7A73_41CB_7C0E5A69486A",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09F3A95D_05BF_EF83_4171_6F3C5D134544_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D456A27_5233_7A73_41A8_52277CA29202",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E6A508E_0571_E910_4182_3FA194973CF0_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D4C0A2B_5233_7A73_41D2_21F8EE4ACAD1",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E43CCF0_0571_1AF0_4193_A50AEE29DCAA_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D496A2D_5233_7A74_41CD_81E131B35569",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D493A2D_5233_7A74_41C3_DD3F254645F5",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09917766_05BF_2381_4162_44384798B870_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D4D8A2B_5233_7A73_41C2_74D4846817F5",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D4D4A2B_5233_7A73_41C6_DE204E547788",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D4D2A2B_5233_7A73_41C2_A151FC1F3489",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_96DB16D9_867D_59EB_41D0_06277297C024",
 "frameCount": 24,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E6EFAE3_0571_3917_417B_0AFD616FD093_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 500,
   "height": 750
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA37A37_5233_7A53_41CC_AC4CDE692EF5",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA2EA37_5233_7A53_41C2_40CFAE9E0941",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_2B8AC8E5_0E49_EE83_4184_7F8DBE528460_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DACAA3B_5233_7A53_4178_9627E457BF88",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DAC1A3B_5233_7A53_41C1_8E8FE86DD926",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_152BA07A_0E46_FD81_41A1_67DE57E97658_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DADEA3A_5233_7A5D_41A4_309BE3FDF532",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DAD7A3A_5233_7A5D_41C3_3B5BB093DC6D",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_15CDCACE_0E46_E281_419B_D1DF72349238_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D4A9A2B_5233_7A73_41B3_F338BF667FDD",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D4A6A2D_5233_7A74_41C5_02EF42E1E303",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_96DD26D9_867D_59EA_41B4_B213616CBE44",
 "frameCount": 24,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 500,
   "height": 750
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_96DDA6DA_867D_59E9_41D4_577D26FC3839",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_09916AFC_05BF_E281_4186_720CA74703AB_1_HS_4_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB30A30_5233_7A6C_41C7_78EB0891E777",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB2EA30_5233_7A6C_41B5_57964BD464A5",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_199FF39F_0EF9_E2BF_41A4_52C2CFE362F8_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DAF3A3A_5233_7A5D_41C5_E016817F9498",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DAE5A3A_5233_7A5D_41BC_957871324BDC",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1524D6FD_0E49_2283_41A5_9DDDE0CAC813_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB47A30_5233_7A6C_41B6_8040B63ADA22",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB3DA30_5233_7A6C_41B6_59A217589FD7",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_19C5D87C_0EFF_6D81_4192_778A4793128C_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DBB6A34_5233_7A54_41CE_F7F05A5DC395",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DBADA35_5233_7A54_41C0_BA8178636EBF",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1539EF00_0E49_6381_41A6_6AD6645EA450_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB96A35_5233_7A54_41D2_9322DD5011A4",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_16B38107_0E49_7F8E_4177_6C70554D3F4A_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DBD6A33_5233_7A6C_41D4_86A258266480",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_8B41D72E_867D_58A8_4181_A0BA55358052",
 "frameCount": 24,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_1635DD62_0E7F_E781_41A3_F9A0EF55C25B_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 500,
   "height": 750
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DABBA3B_5233_7A53_41D3_36D459A98BFD",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DAACA3B_5233_7A53_41C4_692F12D97F26",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_15CDC62D_0E46_E582_41A6_4EEE99E67134_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DA01A39_5233_7A5F_41C1_25FD086882F4",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DAFBA39_5233_7A5F_41B4_ACA7E51B383F",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_15C25C28_0E49_6581_418D_F485BF9783EC_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_8B4DE728_867D_58A8_41D9_6ACBFD974525",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_8B4D8729_867D_58A8_41D8_0DD777B288EB",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_098FAD68_05BF_2781_418A_00B0C6ECE5CE_1_HS_3_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB55A2F_5233_7A74_41CE_87EBF8A7445B",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5DB4CA2F_5233_7A74_41B0_71E5706499EC",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_19C52053_0EFF_5D87_4196_595FEE001077_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D407A29_5233_7A7F_41C2_DAA07D1FAF23",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_1_HS_0_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_5D403A29_5233_7A7E_41B0_67DD9D4EC54D",
 "frameCount": 21,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_1_HS_1_0.png",
   "class": "ImageResourceLevel",
   "width": 480,
   "height": 300
  }
 ]
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_96E7E6D7_867D_59E7_41DD_8285D366A519",
 "frameCount": 24,
 "colCount": 4,
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_0E6E98D2_0571_7930_417B_EF8C9D8D1A85_1_HS_2_0.png",
   "class": "ImageResourceLevel",
   "width": 500,
   "height": 750
  }
 ]
},
{
 "backgroundColorDirection": "vertical",
 "gap": 10,
 "children": [
  "this.IconButton_42B6B7D2_5CC7_4312_41C8_C457A97D502F",
  "this.Label_7CF9E542_5D43_4772_41CE_B1DD66C5635B"
 ],
 "id": "Container_42B6D7D2_5CC7_4312_41B2_3D18F06F24ED",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.3,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "borderSize": 0,
 "height": 140,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "header"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingBottom": 70,
 "paddingTop": 10,
 "itemLabelFontFamily": "Montserrat",
 "id": "ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0",
 "left": 0,
 "selectedItemLabelFontWeight": "bold",
 "class": "ThumbnailGrid",
 "itemMinHeight": 50,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "scrollBarMargin": 2,
 "itemVerticalAlign": "top",
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "shadow": false,
 "itemBorderRadius": 0,
 "itemPaddingLeft": 3,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "rollOverItemLabelFontColor": "#F7931E",
 "width": "100%",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemPaddingRight": 3,
 "selectedItemLabelFontColor": "#F7931E",
 "minHeight": 1,
 "itemMinWidth": 50,
 "height": "75.877%",
 "itemBackgroundColor": [],
 "playList": "this.ThumbnailGrid_42B687D2_5CC7_4312_41B4_68AEE3CC48E0_playlist",
 "propagateClick": false,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "minWidth": 1,
 "itemBackgroundOpacity": 0,
 "itemPaddingTop": 3,
 "verticalAlign": "middle",
 "scrollBarColor": "#F7931E",
 "scrollBarOpacity": 0.5,
 "paddingRight": 70,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "itemBackgroundColorRatios": [],
 "itemLabelGap": 7,
 "paddingLeft": 70,
 "itemHeight": 160,
 "scrollBarVisible": "rollOver",
 "selectedItemThumbnailShadow": true,
 "itemLabelTextDecoration": "none",
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "itemLabelFontWeight": "normal",
 "rollOverItemThumbnailShadow": true,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontSize": 13,
 "itemOpacity": 1,
 "itemThumbnailHeight": 125,
 "borderRadius": 5,
 "itemLabelFontColor": "#666666",
 "itemBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "itemMaxWidth": 1000,
 "itemPaddingBottom": 3,
 "itemHorizontalAlign": "center",
 "itemThumbnailShadow": false,
 "itemMaxHeight": 1000,
 "itemThumbnailWidth": 220,
 "itemLabelFontStyle": "normal",
 "bottom": -0.2,
 "itemLabelHorizontalAlign": "center",
 "itemWidth": 220,
 "itemThumbnailOpacity": 1,
 "itemMode": "normal",
 "gap": 26,
 "itemThumbnailBorderRadius": 0,
 "itemLabelPosition": "bottom",
 "rollOverItemThumbnailShadowColor": "#F7931E",
 "data": {
  "name": "ThumbnailList"
 }
},
{
 "gap": 10,
 "children": [
  "this.Image_4E6D7157_5A36_BA69_41D1_45E39E77A64E"
 ],
 "paddingLeft": 0,
 "id": "Container_4E6D6157_5A36_BA69_41D5_C28962F70D7B",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "55%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "minHeight": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "height": "100%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "middle",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "-left"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "gap": 10,
 "paddingLeft": 0,
 "id": "Container_4E6D9157_5A36_BA69_41B9_07B1C36AE9E9",
 "width": 8,
 "class": "Container",
 "scrollBarMargin": 2,
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "backgroundColor": [
  "#F7931E"
 ],
 "minHeight": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "orange line"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "gap": 0,
 "children": [
  "this.Container_4E6DC158_5A36_BA67_41D3_683267A51952",
  "this.Container_4E6DD158_5A36_BA67_41C8_6EB41F911BF2",
  "this.Container_4E6C2158_5A36_BA67_41C5_CDB187E27453"
 ],
 "paddingLeft": 60,
 "id": "Container_4E6DA158_5A36_BA67_41BB_EDA42D69784A",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "50.264%",
 "shadow": false,
 "overflow": "visible",
 "backgroundOpacity": 1,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 460,
 "childrenInteractionEnabled": false,
 "borderSize": 0,
 "height": "100%",
 "paddingRight": 60,
 "contentOpaque": false,
 "scrollBarOpacity": 0.51,
 "verticalAlign": "top",
 "scrollBarColor": "#0069A3",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "-right"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 20,
 "paddingTop": 20
},
{
 "id": "IconButton_4E6C5158_5A36_BA67_41D4_67E4CA649850",
 "maxWidth": 60,
 "class": "IconButton",
 "maxHeight": 60,
 "width": "25%",
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_4E6C5158_5A36_BA67_41D4_67E4CA649850_rollover.jpg",
 "borderRadius": 0,
 "transparencyActive": false,
 "minHeight": 50,
 "mode": "push",
 "height": "75%",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_4E6C6158_5A36_BA67_41D5_8CC28887B5D9, false, 0, null, null, false)",
 "pressedIconURL": "skin/IconButton_4E6C5158_5A36_BA67_41D4_67E4CA649850_pressed.jpg",
 "minWidth": 50,
 "borderSize": 0,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_4E6C5158_5A36_BA67_41D4_67E4CA649850.jpg",
 "data": {
  "name": "X"
 },
 "paddingLeft": 0,
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "gap": 10,
 "children": [
  "this.HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "overflow": "visible",
 "borderRadius": 40,
 "minHeight": 1,
 "height": 90,
 "propagateClick": false,
 "borderSize": 0,
 "minWidth": 1,
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "data": {
  "name": "header"
 },
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingBottom": 70,
 "paddingTop": 10,
 "itemLabelFontFamily": "Times New Roman",
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "itemMinHeight": 50,
 "selectedItemLabelFontWeight": "bold",
 "class": "ThumbnailGrid",
 "selectedItemThumbnailShadowBlurRadius": 16,
 "scrollBarMargin": 2,
 "itemVerticalAlign": "top",
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "scrollBarWidth": 10,
 "itemBorderRadius": 0,
 "itemPaddingLeft": 3,
 "backgroundOpacity": 0,
 "shadow": false,
 "horizontalAlign": "center",
 "rollOverItemLabelFontColor": "#A2B935",
 "width": "100%",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemPaddingRight": 3,
 "selectedItemLabelFontColor": "#A2B935",
 "minHeight": 1,
 "itemMinWidth": 50,
 "height": "83.129%",
 "itemBackgroundColor": [],
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "selectedItemThumbnailShadowVerticalLength": 0,
 "minWidth": 1,
 "itemBackgroundOpacity": 0,
 "propagateClick": false,
 "verticalAlign": "middle",
 "scrollBarColor": "#FF9900",
 "scrollBarOpacity": 0.5,
 "itemPaddingTop": 3,
 "paddingRight": 70,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "itemBackgroundColorRatios": [],
 "itemLabelGap": 7,
 "itemHeight": 156,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 70,
 "selectedItemThumbnailShadow": true,
 "itemLabelTextDecoration": "none",
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "itemLabelFontWeight": "bold",
 "rollOverItemThumbnailShadow": true,
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontSize": 14,
 "itemOpacity": 1,
 "itemThumbnailHeight": 125,
 "borderRadius": 5,
 "itemLabelFontColor": "#666666",
 "itemBackgroundColorDirection": "vertical",
 "itemMaxWidth": 1000,
 "borderSize": 0,
 "itemPaddingBottom": 3,
 "itemHorizontalAlign": "center",
 "itemThumbnailShadow": false,
 "itemMaxHeight": 1000,
 "itemThumbnailWidth": 220,
 "itemLabelFontStyle": "normal",
 "itemWidth": 220,
 "itemLabelHorizontalAlign": "center",
 "itemThumbnailOpacity": 1,
 "itemMode": "normal",
 "gap": 26,
 "itemThumbnailBorderRadius": 0,
 "itemLabelPosition": "bottom",
 "rollOverItemThumbnailShadowColor": "#A2B935",
 "data": {
  "name": "ThumbnailList5161"
 }
},
{
 "paddingLeft": 0,
 "fontFamily": "Montserrat",
 "backgroundColorDirection": "vertical",
 "id": "Button_03D37B27_0C7A_63B3_41A1_89572D8C8762",
 "gap": 5,
 "shadowBlurRadius": 15,
 "width": 110,
 "class": "Button",
 "shadowSpread": 1,
 "iconWidth": 0,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "backgroundOpacity": 0,
 "layout": "horizontal",
 "horizontalAlign": "center",
 "iconBeforeLabel": true,
 "pressedBackgroundOpacity": 1,
 "borderRadius": 0,
 "shadowColor": "#000000",
 "textDecoration": "none",
 "height": 40,
 "rollOverShadow": false,
 "minHeight": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000"
 ],
 "propagateClick": false,
 "borderColor": "#000000",
 "borderSize": 0,
 "backgroundColorRatios": [
  0
 ],
 "fontSize": 12,
 "minWidth": 1,
 "rollOverBackgroundOpacity": 0.8,
 "label": "HOUSE INFO",
 "paddingRight": 0,
 "rollOverBackgroundColor": [
  "#BBD149"
 ],
 "verticalAlign": "middle",
 "fontStyle": "normal",
 "click": "this.setComponentVisibility(this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95, true, 0, null, null, false)",
 "iconHeight": 0,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button house info"
 },
 "pressedBackgroundColor": [
  "#BBD149"
 ],
 "fontWeight": "bold",
 "cursor": "hand",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "fontFamily": "Montserrat",
 "backgroundColorDirection": "vertical",
 "id": "Button_1FDDCF4A_0C0A_23FD_417A_1C14E098FDFD",
 "gap": 5,
 "shadowBlurRadius": 15,
 "width": 130,
 "class": "Button",
 "shadowSpread": 1,
 "iconWidth": 32,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "backgroundOpacity": 0,
 "layout": "horizontal",
 "horizontalAlign": "center",
 "iconBeforeLabel": true,
 "pressedBackgroundOpacity": 1,
 "borderRadius": 0,
 "shadowColor": "#000000",
 "textDecoration": "none",
 "height": 40,
 "minHeight": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": false,
 "borderColor": "#000000",
 "borderSize": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 12,
 "minWidth": 1,
 "rollOverBackgroundOpacity": 0.8,
 "label": "PANORAMA LIST",
 "paddingRight": 0,
 "rollOverBackgroundColor": [
  "#BBD149"
 ],
 "verticalAlign": "middle",
 "fontStyle": "normal",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button panorama list"
 },
 "pressedBackgroundColor": [
  "#BBD149"
 ],
 "fontWeight": "bold",
 "cursor": "hand",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "fontFamily": "Montserrat",
 "backgroundColorDirection": "vertical",
 "id": "Button_1CA392FC_0C0A_2295_41A3_18DEA65FB6AD",
 "gap": 5,
 "shadowBlurRadius": 15,
 "width": 90,
 "class": "Button",
 "shadowSpread": 1,
 "iconWidth": 32,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "backgroundOpacity": 0,
 "layout": "horizontal",
 "horizontalAlign": "center",
 "iconBeforeLabel": true,
 "pressedBackgroundOpacity": 1,
 "borderRadius": 0,
 "shadowColor": "#000000",
 "textDecoration": "none",
 "height": 40,
 "minHeight": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": false,
 "borderColor": "#000000",
 "borderSize": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 12,
 "minWidth": 1,
 "rollOverBackgroundOpacity": 0.8,
 "label": "LOCATION",
 "paddingRight": 0,
 "rollOverBackgroundColor": [
  "#BBD149"
 ],
 "verticalAlign": "middle",
 "fontStyle": "normal",
 "click": "this.setComponentVisibility(this.Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F, true, 0, null, null, false)",
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button location"
 },
 "pressedBackgroundColor": [
  "#BBD149"
 ],
 "fontWeight": "bold",
 "cursor": "hand",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "fontFamily": "Montserrat",
 "backgroundColorDirection": "vertical",
 "id": "Button_1FE4B611_0C0A_256F_418E_EA27E66F8360",
 "gap": 5,
 "shadowBlurRadius": 15,
 "width": 103,
 "class": "Button",
 "shadowSpread": 1,
 "iconWidth": 32,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "backgroundOpacity": 0,
 "layout": "horizontal",
 "horizontalAlign": "center",
 "iconBeforeLabel": true,
 "pressedBackgroundOpacity": 1,
 "borderRadius": 0,
 "shadowColor": "#000000",
 "textDecoration": "none",
 "height": 40,
 "minHeight": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": false,
 "borderColor": "#000000",
 "borderSize": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 12,
 "minWidth": 1,
 "rollOverBackgroundOpacity": 0.8,
 "label": "FLOORPLAN",
 "paddingRight": 0,
 "rollOverBackgroundColor": [
  "#BBD149"
 ],
 "verticalAlign": "middle",
 "fontStyle": "normal",
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button floorplan"
 },
 "pressedBackgroundColor": [
  "#BBD149"
 ],
 "fontWeight": "bold",
 "cursor": "hand",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "fontFamily": "Montserrat",
 "backgroundColorDirection": "vertical",
 "id": "Button_1EBF3282_0C0A_1D6D_4190_52FC7F8C00A5",
 "gap": 5,
 "shadowBlurRadius": 15,
 "width": 112,
 "class": "Button",
 "shadowSpread": 1,
 "iconWidth": 32,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "backgroundOpacity": 0,
 "layout": "horizontal",
 "horizontalAlign": "center",
 "iconBeforeLabel": true,
 "pressedBackgroundOpacity": 1,
 "borderRadius": 0,
 "shadowColor": "#000000",
 "textDecoration": "none",
 "height": 40,
 "minHeight": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": false,
 "borderColor": "#000000",
 "borderSize": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 12,
 "minWidth": 1,
 "rollOverBackgroundOpacity": 0.8,
 "label": "PHOTOALBUM",
 "paddingRight": 0,
 "rollOverBackgroundColor": [
  "#BBD149"
 ],
 "verticalAlign": "middle",
 "fontStyle": "normal",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false)",
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button photoalbum"
 },
 "pressedBackgroundColor": [
  "#BBD149"
 ],
 "fontWeight": "bold",
 "cursor": "hand",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "fontFamily": "Montserrat",
 "backgroundColorDirection": "vertical",
 "id": "Button_33E0F47E_11C1_A20D_419F_BB809AD89259",
 "gap": 5,
 "shadowBlurRadius": 15,
 "width": 90,
 "class": "Button",
 "shadowSpread": 1,
 "iconWidth": 32,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "backgroundOpacity": 0,
 "layout": "horizontal",
 "horizontalAlign": "center",
 "iconBeforeLabel": true,
 "pressedBackgroundOpacity": 1,
 "borderRadius": 0,
 "shadowColor": "#000000",
 "textDecoration": "none",
 "height": 40,
 "minHeight": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": false,
 "borderColor": "#000000",
 "borderSize": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "fontSize": 12,
 "minWidth": 1,
 "rollOverBackgroundOpacity": 0.8,
 "label": "CONTACT",
 "paddingRight": 0,
 "rollOverBackgroundColor": [
  "#BBD149"
 ],
 "verticalAlign": "middle",
 "fontStyle": "normal",
 "click": "this.setComponentVisibility(this.Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08, true, 0, null, null, false)",
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button contact"
 },
 "pressedBackgroundColor": [
  "#BBD149"
 ],
 "fontWeight": "bold",
 "cursor": "hand",
 "paddingBottom": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "maxWidth": 60,
 "class": "IconButton",
 "maxHeight": 60,
 "width": 60,
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "transparencyActive": true,
 "height": 60,
 "minHeight": 1,
 "mode": "toggle",
 "propagateClick": false,
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "minWidth": 1,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "data": {
  "name": "image button menu"
 },
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "maxWidth": 58,
 "class": "IconButton",
 "maxHeight": 58,
 "width": 58,
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "borderRadius": 0,
 "transparencyActive": true,
 "height": 58,
 "minHeight": 1,
 "mode": "push",
 "propagateClick": false,
 "click": "this.shareTwitter(window.location.href)",
 "borderSize": 0,
 "minWidth": 1,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "data": {
  "name": "IconButton TWITTER"
 },
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "id": "IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521",
 "maxWidth": 58,
 "class": "IconButton",
 "maxHeight": 58,
 "width": 58,
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521_rollover.png",
 "borderRadius": 0,
 "transparencyActive": true,
 "height": 58,
 "minHeight": 1,
 "mode": "push",
 "propagateClick": false,
 "click": "this.shareFacebook(window.location.href)",
 "borderSize": 0,
 "minWidth": 1,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521.png",
 "data": {
  "name": "IconButton FB"
 },
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "gap": 10,
 "children": [
  "this.Image_04FF3C2C_1216_7593_41AF_91EA0BBCCE77"
 ],
 "paddingLeft": 10,
 "id": "Container_04FF2C2C_1216_7593_4195_88C3C7049763",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "50%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "minHeight": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "height": "100%",
 "paddingRight": 10,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "middle",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "-left"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 10,
 "paddingTop": 10
},
{
 "gap": 0,
 "children": [
  "this.Container_04FF1C2C_1216_7593_417B_D7E74ABC91E3",
  "this.Container_04FFEC2C_1216_7593_41A4_4CD23AB66B04",
  "this.Container_04FF8C2D_1216_75ED_41A5_B4FCB592F167"
 ],
 "paddingLeft": 60,
 "id": "Container_04FF0C2C_1216_7593_419A_8AC354592A51",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "50%",
 "shadow": false,
 "overflow": "visible",
 "backgroundOpacity": 1,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 400,
 "borderSize": 0,
 "height": "100%",
 "paddingRight": 60,
 "contentOpaque": false,
 "scrollBarOpacity": 0.51,
 "verticalAlign": "top",
 "scrollBarColor": "#0069A3",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "-right"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 20,
 "paddingTop": 20
},
{
 "id": "IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A",
 "maxWidth": 60,
 "class": "IconButton",
 "maxHeight": 60,
 "width": "25%",
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A_rollover.jpg",
 "borderRadius": 0,
 "transparencyActive": false,
 "minHeight": 50,
 "mode": "push",
 "height": "75%",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95, false, 0, null, null, false)",
 "pressedIconURL": "skin/IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A_pressed.jpg",
 "minWidth": 50,
 "borderSize": 0,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A.jpg",
 "data": {
  "name": "X"
 },
 "paddingLeft": 0,
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "gap": 10,
 "children": [
  "this.WebFrame_198A3B12_1666_89B6_41B5_4C2585EFD00E"
 ],
 "paddingLeft": 10,
 "id": "Container_1813DA3E_1663_8BF1_4193_F28A53801FBC",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "70%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "minHeight": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "height": "100%",
 "paddingRight": 10,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "middle",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "-left"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 10,
 "paddingTop": 10
},
{
 "gap": 0,
 "children": [
  "this.Container_18121A3E_1663_8BF1_41B4_AB4C2B45EFFF",
  "this.Container_18120A3E_1663_8BF1_419D_69232EA5FB3D",
  "this.Container_18128A3F_1663_8BEF_41B6_51D1938FA48A"
 ],
 "paddingLeft": 40,
 "id": "Container_1813FA3E_1663_8BF1_4180_5027A2A87866",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "30%",
 "shadow": false,
 "overflow": "visible",
 "backgroundOpacity": 1,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 350,
 "borderSize": 0,
 "height": "100%",
 "paddingRight": 50,
 "contentOpaque": false,
 "scrollBarOpacity": 0.51,
 "verticalAlign": "top",
 "scrollBarColor": "#0069A3",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "-right"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 20,
 "paddingTop": 20
},
{
 "id": "IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1",
 "maxWidth": 60,
 "class": "IconButton",
 "maxHeight": 60,
 "width": "25%",
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1_rollover.jpg",
 "borderRadius": 0,
 "transparencyActive": false,
 "minHeight": 50,
 "mode": "push",
 "height": "75%",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F, false, 0, null, null, false)",
 "pressedIconURL": "skin/IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1_pressed.jpg",
 "minWidth": 50,
 "borderSize": 0,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1.jpg",
 "data": {
  "name": "X"
 },
 "paddingLeft": 0,
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "gap": 10,
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "paddingLeft": 0,
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "shadow": false,
 "overflow": "visible",
 "backgroundOpacity": 0.3,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "height": "100%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container photo"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "gap": 10,
 "children": [
  "this.Image_0DEC8FEC_12FA_D26C_4162_7A2BAB1DA270"
 ],
 "paddingLeft": 10,
 "id": "Container_0DEC9FEC_12FA_D293_41A0_DAD5B350B643",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "85%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "minHeight": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "height": "100%",
 "paddingRight": 10,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "middle",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "-left"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 10,
 "paddingTop": 10
},
{
 "gap": 0,
 "children": [
  "this.Container_0DECAFED_12FA_D26D_4191_988031ED4C85",
  "this.Container_0DECDFED_12FA_D26D_41A3_11915FF353DB",
  "this.Container_0DECEFED_12FA_D26D_4184_68D80FD2C88F"
 ],
 "paddingLeft": 50,
 "id": "Container_0DECBFED_12FA_D26D_41AD_EE1B8CC7BCC8",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "50%",
 "shadow": false,
 "overflow": "visible",
 "backgroundOpacity": 1,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 460,
 "borderSize": 0,
 "height": "100%",
 "paddingRight": 50,
 "contentOpaque": false,
 "scrollBarOpacity": 0.51,
 "verticalAlign": "top",
 "scrollBarColor": "#0069A3",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "-right"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 20,
 "paddingTop": 20
},
{
 "id": "IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4",
 "maxWidth": 60,
 "class": "IconButton",
 "maxHeight": 60,
 "width": "25%",
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4_rollover.jpg",
 "borderRadius": 0,
 "transparencyActive": false,
 "minHeight": 50,
 "mode": "push",
 "height": "75%",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08, false, 0, null, null, false)",
 "pressedIconURL": "skin/IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4_pressed.jpg",
 "minWidth": 50,
 "borderSize": 0,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4.jpg",
 "data": {
  "name": "X"
 },
 "paddingLeft": 0,
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "pressedRollOverIconURL": "skin/IconButton_42B6B7D2_5CC7_4312_41C8_C457A97D502F_pressed_rollover.jpg",
 "id": "IconButton_42B6B7D2_5CC7_4312_41C8_C457A97D502F",
 "maxWidth": 60,
 "class": "IconButton",
 "right": 20,
 "maxHeight": 60,
 "width": "100%",
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "right",
 "rollOverIconURL": "skin/IconButton_42B6B7D2_5CC7_4312_41C8_C457A97D502F_rollover.jpg",
 "borderRadius": 0,
 "transparencyActive": false,
 "top": 20,
 "minHeight": 50,
 "mode": "push",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_42B697D2_5CC7_4312_41C3_D35F999D31FE, false, 0, null, null, false)",
 "height": "36.14%",
 "pressedIconURL": "skin/IconButton_42B6B7D2_5CC7_4312_41C8_C457A97D502F_pressed.jpg",
 "minWidth": 50,
 "borderSize": 0,
 "paddingRight": 0,
 "verticalAlign": "top",
 "iconURL": "skin/IconButton_42B6B7D2_5CC7_4312_41C8_C457A97D502F.jpg",
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "fontFamily": "Poppins ExtraBold",
 "textDecoration": "none",
 "id": "Label_7CF9E542_5D43_4772_41CE_B1DD66C5635B",
 "left": "-0.08%",
 "width": "61%",
 "class": "Label",
 "shadow": false,
 "backgroundOpacity": 0,
 "text": "POINT LIST",
 "horizontalAlign": "center",
 "borderRadius": 0,
 "borderSize": 0,
 "minHeight": 1,
 "height": "71.429%",
 "propagateClick": false,
 "fontSize": "10vmin",
 "minWidth": 1,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "fontStyle": "normal",
 "fontColor": "#FF9900",
 "bottom": "10.42%",
 "data": {
  "name": "Label15823"
 },
 "fontWeight": "normal",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "id": "Image_4E6D7157_5A36_BA69_41D1_45E39E77A64E",
 "left": "0%",
 "maxWidth": 2000,
 "class": "Image",
 "maxHeight": 1000,
 "width": "100%",
 "shadow": false,
 "backgroundOpacity": 0,
 "url": "skin/Image_4E6D7157_5A36_BA69_41D1_45E39E77A64E.jpeg",
 "horizontalAlign": "center",
 "borderRadius": 0,
 "top": "0%",
 "minHeight": 1,
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "verticalAlign": "bottom",
 "scaleMode": "fit_outside",
 "data": {
  "name": "Image"
 },
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "gap": 0,
 "paddingLeft": 0,
 "id": "Container_4E6DC158_5A36_BA67_41D3_683267A51952",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.3,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "minHeight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "height": "7%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container space"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 20
},
{
 "gap": 0,
 "children": [
  "this.HTMLText_4E6DE158_5A36_BA67_41C3_E74E7E8FBECE",
  "this.Container_4E6DF158_5A36_BA67_41C1_72FE272D1F12"
 ],
 "paddingLeft": 0,
 "id": "Container_4E6DD158_5A36_BA67_41C8_6EB41F911BF2",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.3,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "minHeight": 520,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 100,
 "childrenInteractionEnabled": false,
 "borderSize": 0,
 "height": "100%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.79,
 "verticalAlign": "middle",
 "scrollBarColor": "#E73B2C",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container text"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "gap": 10,
 "id": "Container_4E6C2158_5A36_BA67_41C5_CDB187E27453",
 "width": 370,
 "class": "Container",
 "scrollBarMargin": 2,
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.3,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 40,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "borderSize": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container space"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 80,
 "id": "HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
 "left": "0%",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "77.15%",
 "shadow": false,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "minHeight": 100,
 "height": "100%",
 "top": "0%",
 "propagateClick": false,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ff9900;font-size:5.79vh;font-family:'Poppins ExtraBold';\"><B>PANORAMA LIST</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 36
},
{
 "paddingLeft": 0,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "maxWidth": 60,
 "class": "IconButton",
 "right": 20,
 "maxHeight": 60,
 "width": "25%",
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "right",
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "borderRadius": 0,
 "transparencyActive": false,
 "top": 20,
 "minHeight": 50,
 "mode": "push",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "height": "75%",
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "minWidth": 50,
 "borderSize": 0,
 "paddingRight": 0,
 "verticalAlign": "top",
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "id": "Image_04FF3C2C_1216_7593_41AF_91EA0BBCCE77",
 "left": "0%",
 "maxWidth": 2000,
 "class": "Image",
 "maxHeight": 1000,
 "width": "100%",
 "shadow": false,
 "backgroundOpacity": 0,
 "url": "skin/Image_04FF3C2C_1216_7593_41AF_91EA0BBCCE77.jpg",
 "horizontalAlign": "center",
 "borderRadius": 0,
 "top": "0%",
 "minHeight": 1,
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "verticalAlign": "bottom",
 "scaleMode": "fit_outside",
 "data": {
  "name": "Image40635"
 },
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "gap": 0,
 "id": "Container_04FF1C2C_1216_7593_417B_D7E74ABC91E3",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.3,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "height": 60,
 "minHeight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "borderSize": 0,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container space"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 20
},
{
 "gap": 0,
 "children": [
  "this.HTMLText_04FFCC2C_1216_7593_41A3_D345BDE131A2",
  "this.Container_0BD17D93_1236_F6B5_4193_247950F46092",
  "this.Container_04FFDC2C_1216_7593_41A7_64E2588509FB"
 ],
 "paddingLeft": 0,
 "id": "Container_04FFEC2C_1216_7593_41A4_4CD23AB66B04",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.3,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "minHeight": 200,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 100,
 "borderSize": 0,
 "height": "100%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.79,
 "verticalAlign": "top",
 "scrollBarColor": "#E73B2C",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container text"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "gap": 10,
 "id": "Container_04FF8C2D_1216_75ED_41A5_B4FCB592F167",
 "width": 370,
 "class": "Container",
 "scrollBarMargin": 2,
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.3,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 40,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "borderSize": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container space"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "id": "WebFrame_198A3B12_1666_89B6_41B5_4C2585EFD00E",
 "left": "0%",
 "class": "WebFrame",
 "right": "0%",
 "shadow": false,
 "backgroundOpacity": 1,
 "insetBorder": false,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d426958.695011444!2d39.26460682562743!3d-6.1659828881606344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185d29602a2909e5%3A0xa035af4aad9b7d5f!2zWmFuesOtYmFy!5e0!3m2!1ses!2ses!4v1542269644530\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "borderRadius": 0,
 "borderSize": 0,
 "top": "0%",
 "minHeight": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "minWidth": 1,
 "bottom": "0%",
 "paddingRight": 0,
 "scrollEnabled": true,
 "data": {
  "name": "WebFrame5113"
 },
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "gap": 0,
 "id": "Container_18121A3E_1663_8BF1_41B4_AB4C2B45EFFF",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.3,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "height": 60,
 "minHeight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "borderSize": 0,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container space"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 20
},
{
 "gap": 10,
 "children": [
  "this.HTMLText_18123A3E_1663_8BF1_419F_B7BD72D2053B",
  "this.HTMLText_18125A3F_1663_8BEF_4196_AE566E10BAFC",
  "this.Container_18124A3F_1663_8BEF_4167_4F797ED9B565",
  "this.HTMLText_18127A3F_1663_8BEF_4175_B0DF8CE38BFE",
  "this.Button_18126A3F_1663_8BEF_41A4_B0EDA1A5F4E3"
 ],
 "paddingLeft": 0,
 "id": "Container_18120A3E_1663_8BF1_419D_69232EA5FB3D",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.3,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "minHeight": 520,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 100,
 "borderSize": 0,
 "height": "100%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.79,
 "verticalAlign": "top",
 "scrollBarColor": "#E73B2C",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container text"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 30,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "gap": 10,
 "id": "Container_18128A3F_1663_8BEF_41B6_51D1938FA48A",
 "width": 370,
 "class": "Container",
 "scrollBarMargin": 2,
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.3,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 40,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "borderSize": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container space"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingBottom": 0,
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarRight": 0,
 "class": "ViewerArea",
 "toolTipFontWeight": "normal",
 "width": "100%",
 "progressBarBorderSize": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarProgressBorderRadius": 0,
 "shadow": false,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowVerticalLength": 23,
 "progressBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "transitionDuration": 500,
 "toolTipFontFamily": "Arial Black",
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "minWidth": 1,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipFontColor": "#606060",
 "height": "100%",
 "paddingRight": 0,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#000000",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "progressOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "progressBottom": 2,
 "toolTipShadowHorizontalLength": 23,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "firstTransitionDuration": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "toolTipPaddingRight": 6,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "toolTipBorderSize": 2,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "top": "0%",
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "displayTooltipInTouchScreens": true,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipShadowBlurRadius": 28,
 "borderSize": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#000000",
 "progressBarBorderColor": "#000000",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "transitionMode": "blending",
 "toolTipShadowSpread": 0,
 "progressBorderColor": "#000000",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "12px",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "toolTipShadowColor": "#333333",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "maxWidth": 60,
 "class": "IconButton",
 "maxHeight": 60,
 "width": 165,
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "top": "20%",
 "borderRadius": 0,
 "borderSize": 0,
 "transparencyActive": false,
 "minHeight": 50,
 "mode": "push",
 "propagateClick": false,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "minWidth": 50,
 "bottom": "20%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "data": {
  "name": "IconButton27247"
 },
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "maxWidth": 60,
 "class": "IconButton",
 "right": 10,
 "maxHeight": 60,
 "width": "14%",
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "transparencyActive": false,
 "top": "20%",
 "minHeight": 50,
 "mode": "push",
 "propagateClick": false,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "minWidth": 50,
 "bottom": "20%",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "data": {
  "name": "IconButton29918"
 },
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "maxWidth": 60,
 "class": "IconButton",
 "right": 20,
 "maxHeight": 60,
 "width": "10%",
 "shadow": false,
 "backgroundOpacity": 0,
 "horizontalAlign": "right",
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "borderRadius": 0,
 "transparencyActive": false,
 "top": 20,
 "minHeight": 50,
 "mode": "push",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "height": "10%",
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "minWidth": 50,
 "borderSize": 0,
 "paddingRight": 0,
 "verticalAlign": "top",
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "data": {
  "name": "IconButton54739"
 },
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "paddingLeft": 0,
 "id": "Image_0DEC8FEC_12FA_D26C_4162_7A2BAB1DA270",
 "left": "0%",
 "maxWidth": 2000,
 "class": "Image",
 "maxHeight": 1000,
 "width": "100%",
 "shadow": false,
 "backgroundOpacity": 0,
 "url": "skin/Image_0DEC8FEC_12FA_D26C_4162_7A2BAB1DA270.jpg",
 "horizontalAlign": "center",
 "borderRadius": 0,
 "top": "0%",
 "minHeight": 1,
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "verticalAlign": "middle",
 "scaleMode": "fit_outside",
 "data": {
  "name": "Image"
 },
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "gap": 0,
 "id": "Container_0DECAFED_12FA_D26D_4191_988031ED4C85",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.3,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "height": 60,
 "minHeight": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "borderSize": 0,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container space"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 20
},
{
 "gap": 10,
 "children": [
  "this.HTMLText_30F7AFD1_12F6_52B5_41AC_902D90554335",
  "this.Container_30C72FD2_121E_72B7_4185_0FFA7496FDA6",
  "this.HTMLText_0DECCFED_12FA_D26D_418B_9646D02C4859",
  "this.Button_0DECFFED_12FA_D26D_419B_F907711405D7"
 ],
 "paddingLeft": 0,
 "id": "Container_0DECDFED_12FA_D26D_41A3_11915FF353DB",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.3,
 "layout": "vertical",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "minHeight": 520,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 100,
 "borderSize": 0,
 "height": "100%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.79,
 "verticalAlign": "top",
 "scrollBarColor": "#E73B2C",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container text"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 30,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "gap": 10,
 "id": "Container_0DECEFED_12FA_D26D_4184_68D80FD2C88F",
 "width": 370,
 "class": "Container",
 "scrollBarMargin": 2,
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.3,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 40,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "borderSize": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Container space"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "id": "HTMLText_4E6DE158_5A36_BA67_41C3_E74E7E8FBECE",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 1,
 "height": "23.061%",
 "propagateClick": false,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarColor": "#04A3E1",
 "scrollBarOpacity": 0,
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:40px;font-family:'Poppins ExtraBold';\"><B>DESA TELUK</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:40px;font-family:'Poppins ExtraBold';\"><B>MATA IKAN</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText18899"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 10,
 "paddingTop": 0
},
{
 "gap": 10,
 "children": [
  "this.HTMLText_4E6C1158_5A36_BA67_4190_DE61D92C4C2D"
 ],
 "paddingLeft": 0,
 "id": "Container_4E6DF158_5A36_BA67_41C1_72FE272D1F12",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.3,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "height": "77%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "- content"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "id": "HTMLText_04FFCC2C_1216_7593_41A3_D345BDE131A2",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 1,
 "height": "28%",
 "propagateClick": false,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarColor": "#99BB1B",
 "scrollBarOpacity": 0,
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.5vh;font-family:'Otama.ep';\">HOUSE</SPAN><SPAN STYLE=\"font-size:5.5vh;font-family:'Otama.ep';\"><B>/</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:10.71vh;font-family:'Otama.ep';\"><B>INFO</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText18899"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "gap": 10,
 "id": "Container_0BD17D93_1236_F6B5_4193_247950F46092",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 7,
 "minHeight": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "borderSize": 0,
 "minWidth": 1,
 "backgroundColor": [
  "#000000"
 ],
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "line"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "gap": 22,
 "children": [
  "this.HTMLText_0B1CF751_121B_B3B2_41AA_8DF6E24BB6F1",
  "this.HTMLText_04FFBC2C_1216_7593_41A4_E1B06B145F04"
 ],
 "paddingLeft": 0,
 "id": "Container_04FFDC2C_1216_7593_41A7_64E2588509FB",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 0.3,
 "layout": "horizontal",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "minHeight": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "borderSize": 0,
 "height": "70%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "- content"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "id": "HTMLText_18123A3E_1663_8BF1_419F_B7BD72D2053B",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 1,
 "height": "13%",
 "propagateClick": false,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarColor": "#BBD149",
 "scrollBarOpacity": 0,
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.5vh;font-family:'Otama.ep';\">HOUSE</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText23803"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "id": "HTMLText_18125A3F_1663_8BEF_4196_AE566E10BAFC",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 1,
 "height": "15%",
 "propagateClick": false,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarColor": "#BBD149",
 "scrollBarOpacity": 0,
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.95vh;font-family:'Otama.ep';\"><B>LOCATION</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText24905"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "gap": 10,
 "id": "Container_18124A3F_1663_8BEF_4167_4F797ED9B565",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 7,
 "minHeight": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "borderSize": 0,
 "minWidth": 1,
 "backgroundColor": [
  "#000000"
 ],
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "line"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "id": "HTMLText_18127A3F_1663_8BEF_4175_B0DF8CE38BFE",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 1,
 "height": "100%",
 "propagateClick": false,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarColor": "#B3D237",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#99bb1b;font-size:2.32vh;font-family:'Antonio';\"><B>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. MAECENAS CONGUE EROS MAGNA, ID BIBENDUM EROS MALESUADA VITAE.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.62vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-family:'Open Sans Semibold';\">Address:</SPAN><SPAN STYLE=\"color:#999999;font-family:'Open Sans Semibold';\"> line 1</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-family:'Open Sans Semibold';\">Address:</SPAN><SPAN STYLE=\"color:#999999;font-family:'Open Sans Semibold';\"> line 2</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-family:'Open Sans Semibold';\">Address:</SPAN><SPAN STYLE=\"color:#999999;font-family:'Open Sans Semibold';\"> line 3</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-family:'Open Sans Semibold';\">GPS:</SPAN><SPAN STYLE=\"color:#999999;font-family:'Open Sans Semibold';\"> xxxxxxxxxx</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "data": {
  "name": "HTMLText"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 20,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "fontFamily": "Antonio",
 "id": "Button_18126A3F_1663_8BEF_41A4_B0EDA1A5F4E3",
 "gap": 5,
 "shadowBlurRadius": 6,
 "width": 207,
 "class": "Button",
 "shadowSpread": 1,
 "iconWidth": 32,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "backgroundOpacity": 0.7,
 "layout": "horizontal",
 "horizontalAlign": "center",
 "iconBeforeLabel": true,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "borderRadius": 0,
 "shadowColor": "#000000",
 "textDecoration": "none",
 "height": 59,
 "minHeight": 1,
 "mode": "push",
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "borderColor": "#000000",
 "borderSize": 0,
 "backgroundColor": [
  "#99BB1B"
 ],
 "fontSize": 30,
 "minWidth": 1,
 "rollOverBackgroundOpacity": 1,
 "label": "BOOK NOW",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "fontStyle": "normal",
 "click": "this.openLink('http://www.loremipsum.com', '_blank')",
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button31015"
 },
 "paddingLeft": 0,
 "fontWeight": "bold",
 "visible": false,
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "id": "HTMLText_30F7AFD1_12F6_52B5_41AC_902D90554335",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 1,
 "height": "52%",
 "propagateClick": false,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarColor": "#BBD149",
 "scrollBarOpacity": 0,
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.5vh;font-family:'Otama.ep';\">CONTACT</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:10.71vh;font-family:'Otama.ep';\"><B>INFO</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText24905"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "gap": 10,
 "id": "Container_30C72FD2_121E_72B7_4185_0FFA7496FDA6",
 "scrollBarMargin": 2,
 "class": "Container",
 "width": "100%",
 "shadow": false,
 "overflow": "scroll",
 "backgroundOpacity": 1,
 "layout": "absolute",
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 7,
 "minHeight": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "borderSize": 0,
 "minWidth": 1,
 "backgroundColor": [
  "#000000"
 ],
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "black line"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "id": "HTMLText_0DECCFED_12FA_D26D_418B_9646D02C4859",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 1,
 "height": "100%",
 "propagateClick": false,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarColor": "#B3D237",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#99bb1b;font-size:3.62vh;font-family:'Antonio';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Open Sans Semibold';\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#99bb1b;font-size:3.62vh;font-family:'Antonio';\"><B>CONTACT:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-family:'Open Sans Semibold';\">E-mail:</SPAN><SPAN STYLE=\"color:#999999;font-family:'Open Sans Semibold';\"> Info@loremipsum.com </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-family:'Open Sans Semibold';\">Web: </SPAN><SPAN STYLE=\"color:#999999;font-family:'Open Sans Semibold';\">www.loremipsum.com</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-family:'Open Sans Semibold';\">Tlf.:</SPAN><SPAN STYLE=\"color:#999999;font-family:'Open Sans Semibold';\"> +11 111 111 111</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-family:'Open Sans Semibold';\">Address:</SPAN><SPAN STYLE=\"color:#999999;font-family:'Open Sans Semibold';\"> line 1</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Open Sans Semibold';\">Address line 2</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 20,
 "paddingTop": 0
},
{
 "backgroundColorDirection": "vertical",
 "fontFamily": "Antonio",
 "id": "Button_0DECFFED_12FA_D26D_419B_F907711405D7",
 "gap": 5,
 "shadowBlurRadius": 6,
 "width": 207,
 "class": "Button",
 "shadowSpread": 1,
 "iconWidth": 32,
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "backgroundOpacity": 0.7,
 "layout": "horizontal",
 "horizontalAlign": "center",
 "iconBeforeLabel": true,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "borderRadius": 0,
 "shadowColor": "#000000",
 "textDecoration": "none",
 "height": 59,
 "minHeight": 1,
 "mode": "push",
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "borderColor": "#000000",
 "borderSize": 0,
 "backgroundColor": [
  "#99BB1B"
 ],
 "fontSize": "3.26vh",
 "minWidth": 1,
 "rollOverBackgroundOpacity": 1,
 "label": "BOOK NOW",
 "paddingRight": 0,
 "verticalAlign": "middle",
 "fontStyle": "normal",
 "click": "this.openLink('http://www.loremipsum.com', '_blank')",
 "iconHeight": 32,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button book now"
 },
 "paddingLeft": 0,
 "fontWeight": "bold",
 "cursor": "hand",
 "paddingBottom": 0,
 "paddingTop": 0
},
{
 "id": "HTMLText_4E6C1158_5A36_BA67_4190_DE61D92C4C2D",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "100%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 1,
 "height": "75.45%",
 "propagateClick": false,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarColor": "#F7931E",
 "scrollBarOpacity": 0.5,
 "paddingRight": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:13px;font-family:'Montserrat';\">Dibuat oleh</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f7931e;font-size:20px;font-family:'Montserrat';\"><B>Universitas Internasional Batam</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:14px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:14px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Montserrat Light';\">Terdiri dari,</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Montserrat SemiBold';\">Prodi Pariwisata</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Montserrat Light';\">- Jacky Wijaya | 2146021</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Montserrat Light';\">- Elsa | 2146024</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Montserrat Light';\">- Shelvina | 2146029</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:14px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Montserrat SemiBold';\">Prodi Sistem Informasi</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Montserrat Light';\">- Muhammad Hafiz Ivan Irawan | 2131007</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:'Montserrat Light';\">- William Nurdin Wijaya | 2131139</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText19460"
 },
 "paddingLeft": 10,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 10,
 "paddingTop": 0
},
{
 "id": "HTMLText_0B1CF751_121B_B3B2_41AA_8DF6E24BB6F1",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "50%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 1,
 "height": "100%",
 "propagateClick": false,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarColor": "#99BB1B",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#99bb1b;font-size:2.32vh;font-family:'Antonio';\"><B>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. MAECENAS CONGHE EROS MAGNA.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Open Sans Semibold';\">Proin sit amet pharetra magna. Donec varius eu nisi at facilisis. Vivamus nibh magna, fermentum ac nibh sit amet, euismod efficitur sem. Fusce blandit, purus sed gravida vulputate, justo quam laoreet quam, et dictum mauris arcu vitae justo. Vivamus euismod condimentum ligula quis feugiat. Cras imperdiet tortor mi, a posuere velit tempus et. Maecenas et scelerisque turpis. Quisque in gravida leo, sed dapibus nibh. Ut at consequat turpis.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText12940"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 20
},
{
 "id": "HTMLText_04FFBC2C_1216_7593_41A4_E1B06B145F04",
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "width": "50%",
 "scrollBarWidth": 10,
 "backgroundOpacity": 0,
 "shadow": false,
 "borderRadius": 0,
 "minHeight": 1,
 "height": "100%",
 "propagateClick": false,
 "minWidth": 1,
 "borderSize": 0,
 "scrollBarColor": "#99BB1B",
 "scrollBarOpacity": 0.5,
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Open Sans Semibold';\">Mauris aliquet neque quis libero consequat vest</SPAN><SPAN STYLE=\"font-family:'Open Sans Semibold';\">i</SPAN><SPAN STYLE=\"color:#999999;font-family:'Open Sans Semibold';\">bulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Open Sans Semibold';\">Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.16vh;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-family:'Open Sans Semibold';\">Vivamus vitae iaculis turpis. Aliquam imperdiet, elit sed rutrum mollis, neque lacus aliquam lectus.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText19460"
 },
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "paddingBottom": 0,
 "paddingTop": 20
}],
 "layout": "absolute",
 "mouseWheelEnabled": true,
 "borderRadius": 0,
 "buttonToggleMute": [
  "this.IconButton_600B7BDD_57CA_68DE_41D3_0FD9B1BB393D",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D"
 ],
 "vrPolyfillScale": 0.5,
 "minHeight": 20,
 "desktopMipmappingEnabled": false,
 "mobileMipmappingEnabled": false,
 "propagateClick": false,
 "minWidth": 20,
 "borderSize": 0,
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "creationPolicy": "inAdvance",
 "data": {
  "name": "Player468"
 },
 "scrollBarVisible": "rollOver",
 "downloadEnabled": false,
 "paddingBottom": 0,
 "paddingTop": 0
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
